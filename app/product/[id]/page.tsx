"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag, ArrowLeft, Star, Truck, RotateCcw, Shield, Check } from "lucide-react";
import { useState, use } from "react";
import Link from "next/link";

const productsData: Record<number, {
  id: number; name: string; sku: string; price: number; old: number | null;
  tag: string; fabric: string; description: string; category: string; composition: string[];
}> = {
  1: { id: 1, name: "Izaar Luxury Lawn", sku: "SH-2026-001", price: 8500, old: 10500, tag: "New", fabric: "Premium Lawn Silk blend", description: "A highly elegant three-piece unstitched masterstroke ensemble showcasing fine threadwork overlays across crisp premium-grade summer yarn cloth.", category: "Lawn", composition: ["100% Cotton Base Shirt 3.1m", "Pure Silk Crinkle Dupatta 2.5m", "Dyed Luxury Trousers 2.5m"] },
  2: { id: 2, name: "Noor Embroidered 3-Pc", sku: "SH-2026-002", price: 14200, old: null, tag: "Bestseller", fabric: "Intricate Loomed Weave", description: "Exquisite hand-guided craftsmanship patterns embedded into every square inch of luxury textile surface. Crafted for dynamic modern elegance.", category: "Embroidered", composition: ["Embroidered Front & Panels", "Chiffon Embellished Border Patch", "Premium Cotton Cambric Trousers"] },
};

export default function LuxuryProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Safe unwrap of dynamic route parameters
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id) || 1;
  const product = productsData[productId] || productsData[1];

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"details" | "care" | "delivery">("details");
  const [isBagAdding, setIsBagAdding] = useState(false);

  const sizes = ["Unstitched", "XS", "S", "M", "L", "XL"];
  const toneSwatches = ["bg-[#EDE8E0]", "bg-[#C4B8A8]", "bg-[#0e4d3b]"];

  const handleCartTrigger = () => {
    setIsBagAdding(true);
    setTimeout(() => setIsBagAdding(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#FAF7F3] text-[#1b1815] antialiased">
      {/* Top Banner Accent */}
      <div className="bg-[#1b1815] text-white text-center text-[10px] tracking-[0.3em] uppercase py-2.5">
        SECURE CHECKOUT ARRANGE SYSTEM · GLOBAL INSURED DISPATCH SYSTEM
      </div>

      {/* Navigation Row */}
      <nav className="sticky top-0 z-40 bg-[#FAF7F3]/95 backdrop-blur-md border-b border-[#1b1815]/5 px-6 lg:px-12 py-4 flex items-center justify-between">
        <Link href="/shop" className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#1b1815]/60 hover:text-[#1b1815] transition-colors">
          <ArrowLeft size={12} /> Return to Shop
        </Link>
        <Link href="/" className="text-xl tracking-[0.25em] uppercase font-normal" style={{ fontFamily: "var(--font-marcellus)" }}>
          SHAHANA
        </Link>
        <button className="relative p-1">
          <ShoppingBag size={16} strokeWidth={2} />
        </button>
      </nav>

      {/* Main Structural Detail Segment */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT BLOCK: Dual Column Fine Art Presentation Grid (5 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-[3/4] bg-[#EDE8E0] relative overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.12]">
                <span className="text-5xl font-serif" style={{ fontFamily: "var(--font-marcellus)" }}>S-1</span>
              </div>
            </div>
            <div className="aspect-[3/4] bg-[#E4DCd0] relative overflow-hidden group hidden md:block">
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.12]">
                <span className="text-5xl font-serif" style={{ fontFamily: "var(--font-marcellus)" }}>S-2</span>
              </div>
            </div>
          </div>

          {/* RIGHT BLOCK: Premium Transaction & Detail Interface (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#1b1815]/40">{product.sku}</span>
                <span className="text-[9px] uppercase tracking-widest border border-[#0e4d3b] text-[#0e4d3b] px-2 py-0.5 font-semibold">
                  {product.tag}
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-normal tracking-wide mb-3" style={{ fontFamily: "var(--font-marcellus)" }}>
                {product.name}
              </h1>

              {/* Pricing Context Structure */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-2xl font-light text-[#1b1815]">Rs. {product.price.toLocaleString()}</span>
                {product.old && (
                  <span className="text-base text-[#1b1815]/30 line-through font-light">Rs. {product.old.toLocaleString()}</span>
                )}
              </div>

              <p className="text-sm text-[#1b1815]/70 leading-relaxed font-light mb-8">
                {product.description}
              </p>

              {/* Design Switcher: Tone Variant Swatches */}
              <div className="mb-6">
                <span className="text-[11px] uppercase tracking-widest text-[#1b1815]/40 font-semibold block mb-3">Select Edition Palette</span>
                <div className="flex gap-3">
                  {toneSwatches.map((colorClass, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-8 h-8 rounded-full ${colorClass} transition-all relative flex items-center justify-center outline-none`}
                      style={{ outline: selectedColor === index ? "1px solid #1b1815" : "none", outlineOffset: 3 }}
                    />
                  ))}
                </div>
              </div>

              {/* Design Switcher: Size Configuration Grid */}
              <div className="mb-8">
                <span className="text-[11px] uppercase tracking-widest text-[#1b1815]/40 font-semibold block mb-3">Fit/Stitching Option</span>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs uppercase tracking-widest border transition-all ${
                        selectedSize === size
                          ? "bg-[#1b1815] text-white border-[#1b1815]"
                          : "border-[#1b1815]/15 hover:border-[#1b1815] text-[#1b1815]/80"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Operations Container */}
              <div className="space-y-3 mb-10">
                <button
                  onClick={handleCartTrigger}
                  className={`w-full py-4 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 ${
                    isBagAdding ? "bg-[#0e4d3b] text-white" : "bg-[#1b1815] text-white hover:bg-[#1b1815]/90"
                  }`}
                >
                  {isBagAdding ? "✓ Adding to Bag..." : "Secure Order Placement"}
                </button>
              </div>

              {/* Integrated Micro Info Accordion Strip */}
              <div className="border-t border-[#1b1815]/10 pt-6">
                <div className="flex justify-around text-center gap-2">
                  <div className="flex flex-col items-center">
                    <Truck size={16} className="text-[#0e4d3b] mb-1" />
                    <span className="text-[10px] uppercase tracking-wider text-[#1b1815]/60">3-5 Days Arrival</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <RotateCcw size={16} className="text-[#0e4d3b] mb-1" />
                    <span className="text-[10px] uppercase tracking-wider text-[#1b1815]/60">Easy Return Safe</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}