"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function SiteHeader() {
  const { totalItems } = useCart();

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <Link href="/" className="text-2xl sm:text-3xl font-serif tracking-widest text-black">
          SHAHANA
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide text-gray-800">
          <a href="#" className="hover:text-black">New Arrivals</a>
          <a href="#" className="hover:text-black">Ready to Wear</a>
          <a href="#" className="hover:text-black">Unstitched</a>
          <a href="#" className="hover:text-black">Sale</a>
        </nav>
        <div className="flex items-center gap-5 text-gray-800">
          <span className="text-sm cursor-pointer">Search</span>
          <Link href="/cart" className="text-sm cursor-pointer">
            Cart ({totalItems})
          </Link>
        </div>
      </div>
    </header>
  );
}