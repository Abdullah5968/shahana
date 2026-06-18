"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, SlidersHorizontal, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "../store/cartStore";

const products = [
  { id: 1, name: "Izaar Luxury Lawn", sku: "SH-001", price: 8500, old: 10500, tag: "New", category: "Lawn", fabric: "Premium Pima Lawn", color: "Ivory Silk" },
  { id: 2, name: "Noor Embroidered 3-Pc", sku: "SH-002", price: 14200, old: null, tag: "Bestseller", category: "Embroidered", fabric: "Organic Cotton Lawn", color: "Blush Rose" },
  { id: 3, name: "Gulshan Printed Lawn", sku: "SH-003", price: 6800, old: 8000, tag: "Sale", category: "Lawn", fabric: "Classic Swiss Lawn", color: "Sage Earth" },
  { id: 4, name: "Rania Chiffon Set", sku: "SH-004", price: 18500, old: null, tag: "Luxury Wear", category: "Chiffon", fabric: "Pure Crinkle Chiffon", color: "Desert Nude" },
  { id: 5, name: "Zara Festive 3-Pc", sku: "SH-005", price: 22000, old: null, tag: "New Collection", category: "Festive", fabric: "Hand-loomed Net Mesh", color: "Crimson Maroon" },
  { id: 6, name: "Meher Unstitched Lawn", sku: "SH-006", price: 5500, old: 7000, tag: "Sale", category: "Lawn", fabric: "Luxury Slub Lawn", color: "Porcelain White" },
];

const categories = ["All", "Lawn", "Embroidered", "Chiffon", "Festive"];

export default function LuxuryShop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  
  const cart = useCartStore();
  const cartItemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const filtered = products.filter(p => activeCategory === "All" || p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#FAF7F3] text-[#1b1815]">
      <div className="bg-[#1b1815] text-white text-center text-[10px] tracking-[0.3em] uppercase py-2.5 px-4 font-light">
        HERITAGE CRAFTSMANSHIP · COMPLIMENTARY EXPEDITED DELIVERY NATIONWIDE
      </div>

      <nav className="sticky top-0 z-40 bg-[#FAF7F3]/90 backdrop-blur-md border-b border-[#1b1815]/5 px-6 lg:px-12 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl tracking-[0.25em] font-normal uppercase" style={{ fontFamily: "var(--font-marcellus)" }}>SHAHANA</Link>
        <button onClick={cart.openCart} className="relative p-1">
          <ShoppingBag size={18} strokeWidth={1.5} />
          <span className="absolute -top-1 -right-1 bg-[#0e4d3b] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">{cartItemCount}</span>
        </button>
      </nav>

      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div key={product.id} className="group relative flex flex-col justify-between h-full">
              <div className="block relative overflow-hidden bg-[#EAE4DA] mb-4 aspect-[3/4]">
                <div className="absolute top-4 left-4 z-10 bg-[#0e4d3b] text-white text-[9px] tracking-widest uppercase px-2.5 py-1 font-semibold">{product.tag}</div>
                
                {/* Clicking this panel directly puts the product into state and pulls side drawer out */}
                <button
                  onClick={() => cart.addItem({ id: product.id, name: product.name, price: product.price, size: "Unstitched", fabric: product.fabric })}
                  className="absolute bottom-0 inset-x-0 bg-[#1b1815] text-white text-center text-[10px] tracking-[0.25em] uppercase py-3.5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  Quick Add Item
                </button>
              </div>
              <h3 className="text-sm tracking-wide mb-1 font-medium">{product.name}</h3>
              <span className="text-sm font-semibold">Rs. {product.price.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}