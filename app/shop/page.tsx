"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, SlidersHorizontal, X, Search, ChevronDown, Grid, Square } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

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
  const [viewCols, setViewCols] = useState(2); // Toggle between 1 or 2 columns on mobile easily

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filtered = products.filter(p => activeCategory === "All" || p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#FAF7F3] text-[#1b1815] selection:bg-[#0e4d3b] selection:text-white">
      {/* Dynamic Top Bar */}
      <div className="bg-[#1b1815] text-white text-center text-[10px] tracking-[0.3em] uppercase py-2.5 px-4 font-light">
        HERITAGE CRAFTSMANSHIP · COMPLIMENTARY EXPEDITED DELIVERY NATIONWIDE
      </div>

      {/* Luxury Minimal Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-[#FAF7F3]/90 backdrop-blur-md border-b border-[#1b1815]/5 px-6 lg:px-12 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl tracking-[0.25em] font-normal uppercase" style={{ fontFamily: "var(--font-marcellus)" }}>
          SHAHANA
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-[11px] uppercase tracking-widest text-[#1b1815]/60 hover:text-[#1b1815] transition-colors font-medium">
            ← Back to Editorial
          </Link>
        </div>
      </nav>

      {/* Minimal Header */}
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 pt-16 pb-10 border-b border-[#1b1815]/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#0e4d3b] font-semibold block mb-2">The Catalog</span>
            <h1 className="text-4xl lg:text-5xl font-light tracking-wide font-serif mb-3" style={{ fontFamily: "var(--font-marcellus)" }}>
              All Collections
            </h1>
          </div>
          <p className="text-xs text-[#1b1815]/40 italic max-w-xs font-light">
            Curated silhouettes featuring meticulous hand-embellished details and premium seasonal weaves.
          </p>
        </div>
      </div>

      {/* Premium Sticky Control Deck */}
      <div className="sticky top-[61px] z-30 bg-[#FAF7F3] border-b border-[#1b1815]/5 py-4">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Quick categories horizontal scroller */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pr-4">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 text-[11px] uppercase tracking-widest font-medium transition-all duration-300 ${
                  activeCategory === cat 
                    ? "bg-[#1b1815] text-white rounded-none" 
                    : "text-[#1b1815]/60 hover:text-[#1b1815]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Controls Right */}
          <div className="flex items-center gap-4 border-l border-[#1b1815]/10 pl-4 flex-shrink-0">
            <button 
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-medium border border-[#1b1815]/20 px-4 py-2 hover:border-[#1b1815] transition-colors"
            >
              <SlidersHorizontal size={12} />
              Refine
            </button>
          </div>
        </div>
      </div>

      {/* Curated Product Grid */}
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-6 lg:gap-y-14">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative flex flex-col justify-between h-full"
            >
              <Link href={`/product/${product.id}`} className="block relative overflow-hidden bg-[#EAE4DA] mb-4 aspect-[3/4]">
                {/* Visual Placeholder Frame with Brand Monogram styling */}
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
                  <div className="text-center opacity-[0.15] group-hover:opacity-20 transition-opacity">
                    <div className="w-16 h-16 border border-[#1b1815] rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-lg tracking-widest font-serif" style={{ fontFamily: "var(--font-marcellus)" }}>S</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.25em]">{product.fabric}</span>
                  </div>
                </div>

                {/* Corner Status Label */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[9px] tracking-widest uppercase bg-[#0e4d3b] text-white px-2.5 py-1 font-semibold shadow-sm">
                    {product.tag}
                  </span>
                </div>

                {/* Refined Wishlist Icon Interaction */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#1b1815] opacity-0 group-hover:opacity-100 transform translate-y-[-4px] group-hover:translate-y-0 transition-all duration-300 shadow-sm"
                >
                  <Heart size={13} fill={wishlist.includes(product.id) ? "#6b1f2a" : "none"} stroke={wishlist.includes(product.id) ? "#6b1f2a" : "currentColor"} />
                </button>

                {/* Cinematic Bottom Sliding Action Strip */}
                <div className="absolute bottom-0 inset-x-0 bg-[#1b1815] text-white text-center text-[10px] tracking-[0.25em] uppercase py-3.5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  Quick View Silhouettes
                </div>
              </Link>

              {/* Layout info section with strong visual architecture */}
              <div className="flex flex-col flex-grow justify-between px-1">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="text-sm tracking-wide font-normal text-[#1b1815] group-hover:text-[#0e4d3b] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-[11px] text-[#1b1815]/40 tracking-wider mb-2">{product.fabric} · {product.color}</p>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-[#1b1815]/5">
                  <span className="text-sm font-medium tracking-wide text-[#1b1815]">Rs. {product.price.toLocaleString()}</span>
                  {product.old && (
                    <span className="text-xs text-[#1b1815]/30 line-through font-light">Rs. {product.old.toLocaleString()}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Advanced Filter Drawer System Sliding Panel */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterDrawerOpen(false)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#FAF7F3] z-50 p-8 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#1b1815]/10 mb-8">
                  <h2 className="text-xl uppercase tracking-widest font-normal" style={{ fontFamily: "var(--font-marcellus)" }}>Refine Selection</h2>
                  <button onClick={() => setIsFilterDrawerOpen(false)} className="p-1 hover:opacity-50 transition-opacity">
                    <X size={18} />
                  </button>
                </div>
                
                {/* Expandable filters filter criteria design blocks */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#1b1815]/40 mb-3">Sort Arrangement</h4>
                    <select className="w-full bg-transparent border border-[#1b1815]/20 px-4 py-3 text-xs tracking-wider uppercase outline-none focus:border-[#1b1815]">
                      <option>Chronological Order (Newest)</option>
                      <option>Price: Ascending</option>
                      <option>Price: Descending</option>
                    </select>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-full bg-[#1b1815] text-white text-center py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#0e4d3b] transition-colors"
              >
                Apply Criteria
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}