import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import SiteHeader from "@/components/SiteHeader";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: { items: true },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl sm:text-3xl font-serif text-charcoal mb-4">
          Thank you for shopping with SHAHANA
        </h1>
        <p className="text-gray-600 mb-8">
          Your order has been placed successfully. We&apos;ll contact you soon to confirm delivery.
        </p>

        <div className="border border-gray-200 text-left p-6 mb-8">
          <div className="flex justify-between mb-4">
            <span className="text-sm text-gray-500">Order Number</span>
            <span className="text-sm font-medium text-charcoal">{order.orderNumber}</span>
          </div>

          <div className="space-y-2 mb-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-gray-600">
                <span>{item.name} ({item.size}) x{item.quantity}</span>
                <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-1">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>PKR {order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? "Free" : `PKR ${order.shipping.toLocaleString()}`}</span>
            </div>
            <div className="flex justify-between text-base font-medium text-charcoal">
              <span>Total</span>
              <span>PKR {order.total.toLocaleString()}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4 text-sm text-gray-600 space-y-1">
            <p>{order.customerName}</p>
            <p>{order.phone}</p>
            <p>{order.address}, {order.area}, {order.city}, {order.province}</p>
            <p>Payment: Cash on Delivery</p>
          </div>
        </div>

        <Link
          href="/"
          className="inline-block text-maroon text-white px-8 py-3 text-sm tracking-wide hover:bg-maroon-dark transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}