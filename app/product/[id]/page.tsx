"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag, ArrowLeft, Truck, RotateCcw } from "lucide-react";
import { useState, use } from "react";
import Link from "next/link";
import { useCartStore } from "../../store/cartStore";

const productsData: Record<number, {
  id: number; name: string; sku: string; price: number; old: number | null;
  tag: string; fabric: string; description: string; category: string;
}> = {
  1: { id: 1, name: "Izaar Luxury Lawn", sku: "SH-2026-001", price: 8500, old: 10500, tag: "New", fabric: "Premium Lawn Silk blend", description: "A highly elegant three-piece unstitched masterstroke ensemble showcasing fine threadwork overlays across crisp premium-grade summer yarn cloth.", category: "Lawn" },
  2: { id: 2, name: "Noor Embroidered 3-Pc", sku: "SH-2026-002", price: 14200, old: null, tag: "Bestseller", fabric: "Intricate Loomed Weave", description: "Exquisite hand-guided craftsmanship patterns embedded into every square inch of luxury textile surface. Crafted for dynamic modern elegance.", category: "Embroidered" },
};

export default function LuxuryProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id) || 1;
  const product = productsData[productId] || productsData[1];

  const [selectedSize, setSelectedSize] = useState<string>("Unstitched");
  
  const cart = useCartStore();
  const cartItemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const sizes = ["Unstitched", "XS", "S", "M", "L", "XL"];

  return (
    <main className="min-h-screen bg-[#FAF7F3] text-[#1b1815]">
      <div className="bg-[#1b1815] text-white text-center text-[10px] tracking-[0.3em] uppercase py-2.5">
        SECURE CHECKOUT ARRANGE SYSTEM · GLOBAL INSURED DISPATCH SYSTEM
      </div>

      <nav className="sticky top-0 z-40 bg-[#FAF7F3]/95 backdrop-blur-md border-b border-[#1b1815]/5 px-6 lg:px-12 py-4 flex items-center justify-between">
        <Link href="/shop" className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#1b1815]/60 hover:text-[#1b1815]">
          <ArrowLeft size={12} /> Return to Shop
        </Link>
        <button onClick={cart.openCart} className="relative p-1">
          <ShoppingBag size={18} strokeWidth={1.5} />
          <span className="absolute -top-1 -right-1 bg-[#0e4d3b] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">{cartItemCount}</span>
        </button>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 bg-[#EDE8E0] aspect-[3/4]" />
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h1 className="text-3xl font-serif mb-2" style={{ fontFamily: "var(--font-marcellus)" }}>{product.name}</h1>
            <div className="text-xl font-light mb-6">Rs. {product.price.toLocaleString()}</div>
            <p className="text-sm opacity-70 mb-8">{product.description}</p>

            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest opacity-40 block mb-3">Stitching Options</span>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map(size => (
                  <button 
                    key={size} 
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-xs uppercase tracking-widest border transition-all ${selectedSize === size ? "bg-[#1b1815] text-white" : "border-black/10 hover:border-black"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => cart.addItem({ id: product.id, name: product.name, price: product.price, size: selectedSize, fabric: product.fabric })}
              className="w-full py-4 text-xs uppercase tracking-[0.2em] font-medium bg-[#1b1815] text-white hover:bg-[#0e4d3b] transition-colors"
            >
              Secure Order Placement
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}