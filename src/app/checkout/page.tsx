"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import SiteHeader from "@/components/SiteHeader";

const PAKISTANI_PROVINCES = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Gilgit-Baltistan",
  "Azad Jammu and Kashmir",
  "Islamabad Capital Territory",
];

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    province: "",
    city: "",
    area: "",
    address: "",
    postalCode: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const newErrors: Record<string, string> = {};

    if (!form.customerName.trim()) newErrors.customerName = "Full name is required.";

    const phoneRegex = /^03[0-9]{9}$/;
    if (!phoneRegex.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid Pakistani number, e.g. 03001234567.";
    }

    if (!form.province) newErrors.province = "Please select a province.";
    if (!form.city.trim()) newErrors.city = "City is required.";
    if (!form.area.trim()) newErrors.area = "Area is required.";
    if (!form.address.trim()) newErrors.address = "Complete address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) return;
    if (items.length === 0) {
      setSubmitError("Your cart is empty.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((item) => ({
            id: item.id,
            size: item.size,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      router.push(`/order-confirmation/${data.orderNumber}`);
    } catch {
      setSubmitError("Could not connect to the server. Please try again.");
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <SiteHeader />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-2xl font-serif text-black mb-4">Your cart is empty</h1>
          <Link
            href="/"
            className="inline-block bg-black text-white px-8 py-3 text-sm tracking-wide hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl sm:text-3xl font-serif text-black mb-10">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={form.customerName}
                onChange={(e) => handleChange("customerName", e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 text-sm focus:border-black outline-none"
              />
              {errors.customerName && (
                <p className="text-xs text-red-600 mt-1">{errors.customerName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="03001234567"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 text-sm focus:border-black outline-none"
              />
              {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Email (optional)</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 text-sm focus:border-black outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Province</label>
                <select
                  value={form.province}
                  onChange={(e) => handleChange("province", e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 text-sm focus:border-black outline-none"
                >
                  <option value="">Select</option>
                  {PAKISTANI_PROVINCES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                {errors.province && (
                  <p className="text-xs text-red-600 mt-1">{errors.province}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 text-sm focus:border-black outline-none"
                />
                {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Area</label>
              <input
                type="text"
                value={form.area}
                onChange={(e) => handleChange("area", e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 text-sm focus:border-black outline-none"
              />
              {errors.area && <p className="text-xs text-red-600 mt-1">{errors.area}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Complete Address</label>
              <textarea
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                rows={3}
                className="w-full border border-gray-300 px-4 py-2 text-sm focus:border-black outline-none"
              />
              {errors.address && (
                <p className="text-xs text-red-600 mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Postal Code (optional)</label>
              <input
                type="text"
                value={form.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 text-sm focus:border-black outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Order Notes (optional)</label>
              <textarea
                value={form.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                rows={2}
                className="w-full border border-gray-300 px-4 py-2 text-sm focus:border-black outline-none"
              />
            </div>

            <div className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
              Payment Method: <strong>Cash on Delivery</strong>
            </div>

            {submitError && (
              <p className="text-sm text-red-600">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-black text-white py-3 text-sm tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </button>
          </form>

          <div className="md:col-span-2">
            <div className="border border-gray-200 p-6">
              <h2 className="text-sm font-medium text-black mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span>
                      {item.name} ({item.size}) x{item.quantity}
                    </span>
                    <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between text-base font-medium text-black">
                <span>Total</span>
                <span>PKR {totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}