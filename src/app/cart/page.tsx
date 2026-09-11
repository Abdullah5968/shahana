"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import SiteHeader from "@/components/SiteHeader";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <SiteHeader />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-2xl font-serif text-black mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven&apos;t added anything yet.
          </p>
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
        <h1 className="text-2xl sm:text-3xl font-serif text-black mb-10">
          Your Cart
        </h1>

        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex items-center gap-6 border-b border-gray-200 pb-6"
            >
              <div className="w-24 h-32 bg-gray-100 flex items-center justify-center shrink-0">
                <span className="text-gray-400 text-xs">Image</span>
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-black">{item.name}</p>
                <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                <p className="text-sm text-black mt-2">
                  PKR {item.price.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                  className="w-8 h-8 border border-gray-300 hover:border-black text-sm"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                  className="w-8 h-8 border border-gray-300 hover:border-black text-sm"
                >
                  +
                </button>
              </div>

              <div className="w-24 text-right text-sm font-medium text-black">
                PKR {(item.price * item.quantity).toLocaleString()}
              </div>

              <button
                onClick={() => removeItem(item.id, item.size)}
                className="text-xs text-gray-400 hover:text-red-600 ml-4"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <div className="w-full sm:w-80">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>PKR {totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex justify-between text-base font-medium text-black border-t border-gray-200 pt-4 mb-6">
              <span>Total</span>
              <span>PKR {totalPrice.toLocaleString()}</span>
            </div>
            <Link
              href="/checkout"
              className="block w-full text-center bg-black text-white py-3 text-sm tracking-wide hover:bg-gray-800 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}