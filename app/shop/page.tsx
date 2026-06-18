"use client";

import { motion } from "framer-motion";
import { Heart, SlidersHorizontal, X, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const products = [
  { id: 1, name: "Izaar Luxury Lawn", sku: "SH-001", price: 8500, old: 10500, tag: "New", category: "Lawn", fabric: "Lawn", color: "Ivory" },
  { id: 2, name: "Noor Embroidered 3-Pc", sku: "SH-002", price: 14200, old: null, tag: "Bestseller", category: "Embroidered", fabric: "Lawn", color: "Blush" },
  { id: 3, name: "Gulshan Printed Lawn", sku: "SH-003", price: 6800, old: 8000, tag: "Sale", category: "Lawn", fabric: "Lawn", color: "Sage" },
  { id: 4, name: "Rania Chiffon Set", sku: "SH-004", price: 18500, old: null, tag: "Luxury", category: "Chiffon", fabric: "Chiffon", color: "Nude" },
  { id: 5, name: "Zara Festive 3-Pc", sku: "SH-005", price: 22000, old: null, tag: "New", category: "Festive", fabric: "Net", color: "Maroon" },
  { id: 6, name: "Meher Unstitched Lawn", sku: "SH-006", price: 5500, old: 7000, tag: "Sale", category: "Lawn", fabric: "Lawn", color: "White" },
  { id: 7, name: "Aisha Embroidered Dupatta Set", sku: "SH-007", price: 9800, old: null, tag: "New", category: "Embroidered", fabric: "Chiffon", color: "Gold" },
  { id: 8, name: "Sana Luxury Pret", sku: "SH-008", price: 16500, old: null, tag: "Luxury", category: "Pret", fabric: "Silk", color: "Black" },
  { id: 9, name: "Hira Summer Lawn", sku: "SH-009", price: 7200, old: 9000, tag: "Sale", category: "Lawn", fabric: "Lawn", color: "Blue" },
  { id: 10, name: "Layla Chiffon 3-Pc", sku: "SH-010", price: 19800, old: null, tag: "Luxury", category: "Chiffon", fabric: "Chiffon", color: "Emerald" },
  { id: 11, name: "Maryam Festive Suit", sku: "SH-011", price: 26000, old: null, tag: "New", category: "Festive", fabric: "Net", color: "Navy" },
  { id: 12, name: "Sobia Printed 2-Pc", sku: "SH-012", price: 5900, old: 7500, tag: "Sale", category: "Lawn", fabric: "Lawn", color: "Pink" },
];

const categories = ["All", "Lawn", "Embroidered", "Chiffon", "Festive", "Pret"];
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Bestsellers"];
const priceRanges = ["All", "Under Rs. 8,000", "Rs. 8,000 – 15,000", "Above Rs. 15,000"];

const tagColors: Record<string, string> = {
  Sale: "bg-[#6b1f2a] text-white",
  Luxury: "bg-[#bb9457] text-white",
  Bestseller: "bg-[#1b1815] text-white",
  New: "bg-[#0e4d3b] text-white",
};

const bgColors = [
  "bg-[#EDE8E0]","bg-[#E4DCd0]","bg-[#E8E0D4]","bg-[#DDD5C8]",
  "bg-[#E0D8CC]","bg-[#E8E4DC]","bg-[#D8D0C4]","bg-[#E4E0D8]",
  "bg-[#EAE4DA]","bg-[#DCd4C8]","bg-[#E0DCd4]","bg-[#E8E0D8]",
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [priceRange, setPriceRange] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filtered = products.filter(p => {
    const catMatch = activeCategory === "All" || p.category === activeCategory;
    const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const priceMatch =
      priceRange === "All" ||
      (priceRange === "Under Rs. 8,000" && p.price < 8000) ||
      (priceRange === "Rs. 8,000 – 15,000" && p.price >= 8000 && p.price <= 15000) ||
      (priceRange === "Above Rs. 15,000" && p.price > 15000);
    return catMatch && searchMatch && priceMatch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    return 0;
  });

  return (
    <main className="min-h-screen" style={{ background: "#FAF7F3", color: "#1b1815", fontFamily: "var(--font-inter)" }}>

      {/* Top bar */}
      <div style={{ background: "#1b1815", color: "white" }} className="text-center text-[11px] tracking-[0.25em] uppercase py-2.5 px-4">
        Free shipping on orders above Rs. 5,000
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b backdrop-blur-md px-5 lg:px-10 py-4 flex items-center justify-between"
        style={{ background: "rgba(250,247,243,0.95)", borderColor: "rgba(27,24,21,0.08)" }}>
        <Link href="/" style={{ fontFamily: "var(--font-marcellus)" }} className="text-xl tracking-[0.2em] uppercase">
          SHAHANA
        </Link>
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="pl-8 pr-4 py-2 text-[12px] border outline-none w-52 bg-transparent"
              style={{ borderColor: "rgba(27,24,21,0.15)" }}
            />
          </div>
          <Link href="/" className="text-[12px] uppercase tracking-wider opacity-50 hover:opacity-100 transition-opacity">← Home</Link>
        </div>
      </nav>

      {/* Page hero */}
      <div className="px-5 lg:px-10 pt-12 pb-8 max-w-[1400px] mx-auto">
        <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: "#0e4d3b" }}>All Products</p>
        <h1 style={{ fontFamily: "var(--font-marcellus)" }} className="text-[40px] lg:text-[52px] mb-1">Shop</h1>
        <p className="text-[13px] opacity-40">{sorted.length} pieces found</p>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 pb-24">

        {/* Filter row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b" style={{ borderColor: "rgba(27,24,21,0.08)" }}>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="whitespace-nowrap px-4 py-1.5 text-[11px] uppercase tracking-wider transition-all"
                style={{
                  background: activeCategory === cat ? "#1b1815" : "transparent",
                  color: activeCategory === cat ? "white" : "#1b1815",
                  border: `1px solid ${activeCategory === cat ? "#1b1815" : "rgba(27,24,21,0.2)"}`,
                }}>
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="text-[11px] uppercase tracking-wider bg-transparent border px-3 py-1.5 outline-none cursor-pointer"
              style={{ borderColor: "rgba(27,24,21,0.2)" }}>
              {sortOptions.map(o => <option key={o}>{o}</option>)}
            </select>
            <button onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 text-[11px] uppercase tracking-wider border px-3 py-1.5 transition-colors"
              style={{ borderColor: filtersOpen ? "#1b1815" : "rgba(27,24,21,0.2)" }}>
              <SlidersHorizontal size={13} />
              Filters {filtersOpen ? <X size={11} /> : null}
            </button>
          </div>
        </div>

        {/* Expanded filters */}
        {filtersOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-5 border" style={{ borderColor: "rgba(27,24,21,0.08)", background: "#F5F1EC" }}>
            <p className="text-[10px] uppercase tracking-[0.3em] mb-4 opacity-50">Price Range</p>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map(r => (
                <button key={r} onClick={() => setPriceRange(r)}
                  className="px-4 py-1.5 text-[11px] uppercase tracking-wider transition-all"
                  style={{
                    background: priceRange === r ? "#0e4d3b" : "transparent",
                    color: priceRange === r ? "white" : "#1b1815",
                    border: `1px solid ${priceRange === r ? "#0e4d3b" : "rgba(27,24,21,0.2)"}`,
                  }}>
                  {r}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Grid */}
        {sorted.length === 0 ? (
          <div className="text-center py-24 opacity-30">
            <p style={{ fontFamily: "var(--font-marcellus)" }} className="text-2xl mb-2">No results found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {sorted.map((product, i) => (
              <motion.div key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group">
                <Link href={`/product/${product.id}`}>
                  <div className={`relative aspect-[3/4] ${bgColors[i % bgColors.length]} mb-3 overflow-hidden`}>
                    {/* Placeholder image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center opacity-20">
                        <div className="w-16 h-16 border border-current rounded-full flex items-center justify-center mx-auto mb-2">
                          <span style={{ fontFamily: "var(--font-marcellus)" }} className="text-lg">S</span>
                        </div>
                        <p className="text-[9px] uppercase tracking-widest">{product.fabric}</p>
                      </div>
                    </div>

                    {/* Tag */}
                    <div className="absolute top-3 left-3">
                      <span className={`text-[9px] uppercase tracking-wider px-2 py-1 font-medium ${tagColors[product.tag]}`}>
                        {product.tag}
                      </span>
                    </div>

                    {/* Wishlist */}
                    <button onClick={e => { e.preventDefault(); toggleWishlist(product.id); }}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <Heart size={13} strokeWidth={1.5}
                        fill={wishlist.includes(product.id) ? "#6b1f2a" : "none"}
                        stroke={wishlist.includes(product.id) ? "#6b1f2a" : "currentColor"} />
                    </button>

                    {/* Quick add */}
                    <div className="absolute bottom-0 inset-x-0 text-white text-center text-[10px] tracking-[0.2em] uppercase py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                      style={{ background: "#1b1815" }}>
                      Quick Add
                    </div>
                  </div>

                  <p className="text-[10px] uppercase tracking-wider opacity-30 mb-1">{product.sku}</p>
                  <h3 className="text-[13px] font-medium mb-1 leading-tight">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px]">Rs. {product.price.toLocaleString()}</span>
                    {product.old && <span className="text-[11px] opacity-30 line-through">Rs. {product.old.toLocaleString()}</span>}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}