"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, X, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useCartStore } from "./store/cartStore";

const slides = [
  { id: 1, collection: "Summer Edit 2026", headline: "Effortless.", sub: "Refined silhouettes for the woman who moves with purpose.", cta: "Discover the Edit", bg: "from-[#C9BFB0] to-[#A89880]" },
  { id: 2, collection: "Luxury Lawn", headline: "Crafted\nfor You.", sub: "Hand-finished lawn sets in premium fabrics.", cta: "Shop Luxury Lawn", bg: "from-[#B8C4BA] to-[#8FA896]" },
  { id: 3, collection: "Festive Collection", headline: "Royal\nMoments.", sub: "Embroidered masterpieces for life's grandest occasions.", cta: "Explore Festive", bg: "from-[#C4B49A] to-[#9B8B6E]" },
];

const navLinks = [
  { label: "New Arrivals", href: "/shop" },
  { label: "Unstitched", href: "/shop" },
  { label: "Luxury Collection", href: "/shop" },
  { label: "Eid Collection", href: "/shop" },
  { label: "Sale", href: "/shop" },
];

const collections = [
  { name: "Luxury Lawn", tag: "Summer 2026", col: "md:col-span-2 row-span-2", h: "h-[500px]", bg: "bg-[#D4C9B8]" },
  { name: "Festive Wear", tag: "Limited Edition", col: "", h: "h-56", bg: "bg-[#C8B9A2]" },
  { name: "Chiffon Edit", tag: "Evening", col: "", h: "h-56", bg: "bg-[#BFB3A0]" },
];

const products = [
  { id: 1, name: "Izaar Luxury Lawn", price: 8500, old: 10500, tag: "New", bg: "bg-[#E8E0D4]", fabric: "Premium Lawn Silk blend" },
  { id: 2, name: "Noor Embroidered 3-Pc", price: 14200, old: null, tag: "Bestseller", bg: "bg-[#DDD5C8]", fabric: "Intricate Loomed Weave" },
  { id: 3, name: "Gulshan Printed Lawn", price: 6800, old: 8000, tag: "Sale", bg: "bg-[#E4DCD0]", fabric: "Classic Swiss Lawn" },
  { id: 4, name: "Rania Chiffon Set", price: 18500, old: null, tag: "Luxury", bg: "bg-[#D8D0C4]", fabric: "Pure Crinkle Chiffon" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);

  const cart = useCartStore();
  const cartItemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <main className="min-h-screen bg-[#FAF7F3] text-[#1b1815]" style={{ fontFamily: "var(--font-inter)" }}>
      {/* Announcement */}
      <div className="bg-[#1b1815] text-white text-center text-[11px] tracking-[0.25em] uppercase py-2.5 px-4">
        Free shipping on orders above Rs. 5,000 &nbsp;·&nbsp; New collection live now
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 bg-[#FAF7F3]/95 backdrop-blur-md border-b border-black/8">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 h-16 flex items-center justify-between">
          <button className="lg:hidden p-1" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.slice(0, 3).map(l => (
              <Link key={l.label} href={l.href} className="text-[12px] tracking-[0.1em] uppercase text-[#1b1815]/70 hover:text-[#0e4d3b] transition-colors font-medium">
                {l.label}
              </Link>
            ))}
          </nav>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-[22px] tracking-[0.25em] uppercase font-light" style={{ fontFamily: "var(--font-marcellus)" }}>
            SHAHANA
          </Link>

          <div className="flex items-center gap-5">
            <nav className="hidden lg:flex items-center gap-7 mr-4">
              {navLinks.slice(3).map(l => (
                <Link key={l.label} href={l.href} className="text-[12px] tracking-[0.1em] uppercase text-[#1b1815]/70 hover:text-[#0e4d3b] transition-colors font-medium">
                  {l.label}
                </Link>
              ))}
            </nav>
            <button onClick={() => setSearchOpen(!searchOpen)}><Search size={18} strokeWidth={1.5} /></button>
            <button className="hidden sm:block"><User size={18} strokeWidth={1.5} /></button>
            <button><Heart size={18} strokeWidth={1.5} /></button>
            <button onClick={cart.openCart} className="relative">
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-1.5 bg-[#0e4d3b] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">{cartItemCount}</span>
            </button>
          </div>
        </div>

        {/* Search Layout */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-black/8 overflow-hidden">
              <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-4">
                <input autoFocus placeholder="Search collections, fabrics, styles..." className="w-full bg-transparent text-sm outline-none tracking-wide placeholder:text-black/30" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO CAROUSEL */}
      <section className="relative overflow-hidden" style={{ height: "calc(100vh - 105px)", minHeight: 500 }}>
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className={`absolute inset-0 bg-gradient-to-br ${slides[current].bg} flex items-center`}>
            <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-16 w-full">
              <div className="max-w-xl">
                <p className="text-[11px] tracking-[0.4em] uppercase mb-5 opacity-70">{slides[current].collection}</p>
                <h1 className="text-[clamp(52px,8vw,96px)] leading-[0.95] mb-6 whitespace-pre-line font-serif" style={{ fontFamily: "var(--font-marcellus)" }}>{slides[current].headline}</h1>
                <p className="text-[15px] opacity-70 mb-10 max-w-sm leading-relaxed">{slides[current].sub}</p>
                <div className="flex items-center gap-6">
                  <Link href="/shop" className="flex items-center gap-3 bg-[#1b1815] text-white px-7 py-3.5 text-[12px] tracking-[0.15em] uppercase hover:bg-[#0e4d3b] transition-colors">
                    {slides[current].cta} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <button onClick={prev} className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm flex items-center justify-center"><ChevronLeft size={18} /></button>
        <button onClick={next} className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm flex items-center justify-center"><ChevronRight size={18} /></button>
      </section>

      {/* NEW ARRIVALS */}
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-20">
        <h2 className="text-[32px] lg:text-[40px] mb-10 font-serif" style={{ fontFamily: "var(--font-marcellus)" }}>New Arrivals</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <div key={p.id} className="group flex flex-col justify-between">
              <div className={`relative aspect-[3/4] ${p.bg} mb-3.5 overflow-hidden`}>
                <div className="absolute top-3 left-3 bg-[#0e4d3b] text-white text-[9px] uppercase tracking-wider px-2 py-1 font-medium">{p.tag}</div>
                <button 
                  onClick={() => cart.addItem({ id: p.id, name: p.name, price: p.price, size: "Unstitched", fabric: p.fabric })}
                  className="absolute bottom-0 inset-x-0 bg-[#1b1815] text-white text-center text-[10px] tracking-[0.2em] uppercase py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  Add to Cart
                </button>
              </div>
              <h3 className="text-[13px] font-medium mb-1">{p.name}</h3>
              <span className="text-sm font-medium">Rs. {p.price.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}