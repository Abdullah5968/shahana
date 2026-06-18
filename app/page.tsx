"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, X, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    collection: "Summer Edit 2026",
    headline: "Effortless.",
    sub: "Refined silhouettes for the woman who moves with purpose.",
    cta: "Discover the Edit",
    bg: "from-[#C9BFB0] to-[#A89880]",
    accent: "#0e4d3b",
  },
  {
    id: 2,
    collection: "Luxury Lawn",
    headline: "Crafted\nfor You.",
    sub: "Hand-finished lawn sets in premium fabrics.",
    cta: "Shop Luxury Lawn",
    bg: "from-[#B8C4BA] to-[#8FA896]",
    accent: "#1b1815",
  },
  {
    id: 3,
    collection: "Festive Collection",
    headline: "Royal\nMoments.",
    sub: "Embroidered masterpieces for life's grandest occasions.",
    cta: "Explore Festive",
    bg: "from-[#C4B49A] to-[#9B8B6E]",
    accent: "#6b1f2a",
  },
];

const navLinks = [
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Unstitched", href: "#" },
  { label: "Luxury Collection", href: "#" },
  { label: "Eid Collection", href: "#" },
  { label: "Sale", href: "#" },
];

const collections = [
  { name: "Luxury Lawn", tag: "Summer 2026", col: "md:col-span-2 row-span-2", h: "h-[500px]", bg: "bg-[#D4C9B8]" },
  { name: "Festive Wear", tag: "Limited Edition", col: "", h: "h-56", bg: "bg-[#C8B9A2]" },
  { name: "Chiffon Edit", tag: "Evening", col: "", h: "h-56", bg: "bg-[#BFB3A0]" },
];

const products = [
  { id: 1, name: "Izaar Luxury Lawn", price: "Rs. 8,500", old: "Rs. 10,500", tag: "New", bg: "bg-[#E8E0D4]" },
  { id: 2, name: "Noor Embroidered 3-Pc", price: "Rs. 14,200", old: null, tag: "Bestseller", bg: "bg-[#DDD5C8]" },
  { id: 3, name: "Gulshan Printed Lawn", price: "Rs. 6,800", old: "Rs. 8,000", tag: "Sale", bg: "bg-[#E4DCD0]" },
  { id: 4, name: "Rania Chiffon Set", price: "Rs. 18,500", old: null, tag: "Luxury", bg: "bg-[#D8D0C4]" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);

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
      <header className="sticky top-0 z-50 bg-[#FAF7F3]/95 backdrop-blur-md border-b border-black/8">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 h-16 flex items-center justify-between">
          
          {/* Mobile menu button */}
          <button className="lg:hidden p-1" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Left nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.slice(0, 3).map(l => (
              <Link key={l.label} href={l.href} className="text-[12px] tracking-[0.1em] uppercase text-[#1b1815]/70 hover:text-[#0e4d3b] transition-colors font-medium">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-[22px] tracking-[0.25em] uppercase font-light" style={{ fontFamily: "var(--font-marcellus)" }}>
            SHAHANA
          </Link>

          {/* Right nav + icons */}
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
            <button className="relative">
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-1.5 bg-[#0e4d3b] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">0</span>
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-black/8 overflow-hidden"
            >
              <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-4">
                <input
                  autoFocus
                  placeholder="Search collections, fabrics, styles..."
                  className="w-full bg-transparent text-sm outline-none tracking-wide placeholder:text-black/30"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="lg:hidden border-t border-black/8 bg-[#FAF7F3] px-6 py-6 flex flex-col gap-5"
            >
              {navLinks.map(l => (
                <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm uppercase tracking-widest text-[#1b1815]/80">
                  {l.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO CAROUSEL */}
      <section className="relative overflow-hidden" style={{ height: "calc(100vh - 105px)", minHeight: 500 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 bg-gradient-to-br ${slides[current].bg} flex items-center`}
          >
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "40px 40px" }}
            />
            
            <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-16 w-full">
              <div className="max-w-xl">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-[11px] tracking-[0.4em] uppercase mb-5 opacity-70"
                >
                  {slides[current].collection}
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-[clamp(52px,8vw,96px)] leading-[0.95] mb-6 whitespace-pre-line"
                  style={{ fontFamily: "var(--font-marcellus)" }}
                >
                  {slides[current].headline}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-[15px] opacity-70 mb-10 max-w-sm leading-relaxed"
                >
                  {slides[current].sub}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-6"
                >
                  <Link
                    href="/new-arrivals"
                    className="flex items-center gap-3 bg-[#1b1815] text-white px-7 py-3.5 text-[12px] tracking-[0.15em] uppercase hover:bg-[#0e4d3b] transition-colors"
                  >
                    {slides[current].cta} <ArrowRight size={14} />
                  </Link>
                  <Link href="#collections" className="text-[12px] tracking-[0.15em] uppercase border-b border-current pb-0.5 opacity-60 hover:opacity-100 transition-opacity">
                    View All
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Placeholder image area */}
            <div className="absolute right-0 top-0 bottom-0 w-[45%] hidden lg:flex items-center justify-center opacity-20">
              <div className="w-64 h-64 border border-current rounded-full flex items-center justify-center">
                <span style={{ fontFamily: "var(--font-marcellus)" }} className="text-4xl tracking-widest">S</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <button onClick={prev} className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors">
          <ChevronLeft size={18} />
        </button>
        <button onClick={next} className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors">
          <ChevronRight size={18} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`transition-all duration-300 ${i === current ? "w-8 h-1.5 bg-[#1b1815]" : "w-1.5 h-1.5 bg-[#1b1815]/30 rounded-full"}`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-7 right-8 z-20 text-[11px] tracking-[0.2em] opacity-40">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#0e4d3b] text-[10px] tracking-[0.35em] uppercase mb-2">Just In</p>
            <h2 className="text-[32px] lg:text-[40px]" style={{ fontFamily: "var(--font-marcellus)" }}>New Arrivals</h2>
          </div>
          <Link href="/new-arrivals" className="hidden sm:flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase opacity-60 hover:opacity-100 transition-opacity">
            View All <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <Link href={`/product/${p.id}`}>
                <div className={`relative aspect-[3/4] ${p.bg} mb-3.5 overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 border border-black/10 rounded-full flex items-center justify-center opacity-30">
                      <span style={{ fontFamily: "var(--font-marcellus)" }} className="text-sm">S</span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className={`text-[9px] uppercase tracking-wider px-2 py-1 font-medium ${
                      p.tag === "Sale" ? "bg-[#6b1f2a] text-white" :
                      p.tag === "Luxury" ? "bg-[#bb9457] text-white" :
                      p.tag === "Bestseller" ? "bg-[#1b1815] text-white" :
                      "bg-[#0e4d3b] text-white"
                    }`}>{p.tag}</span>
                  </div>
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white">
                    <Heart size={13} strokeWidth={1.5} />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 bg-[#1b1815] text-white text-center text-[10px] tracking-[0.2em] uppercase py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    Add to Cart
                  </div>
                </div>
                <h3 className="text-[13px] font-medium mb-1 tracking-wide">{p.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[13px]">{p.price}</span>
                  {p.old && <span className="text-[11px] opacity-35 line-through">{p.old}</span>}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COLLECTIONS GRID */}
      <section id="collections" className="max-w-[1400px] mx-auto px-5 lg:px-10 pb-20">
        <div className="text-center mb-10">
          <p className="text-[#0e4d3b] text-[10px] tracking-[0.35em] uppercase mb-2">Shop By</p>
          <h2 className="text-[32px] lg:text-[40px]" style={{ fontFamily: "var(--font-marcellus)" }}>Collections</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {collections.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${c.col} ${c.h} ${c.bg} relative group cursor-pointer overflow-hidden`}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="w-32 h-32 border border-current rounded-full" />
              </div>
              <div className="absolute bottom-5 left-5">
                <p className="text-[9px] tracking-[0.3em] uppercase opacity-60 mb-1">{c.tag}</p>
                <h3 className="text-xl" style={{ fontFamily: "var(--font-marcellus)" }}>{c.name}</h3>
                <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] tracking-widest uppercase">Shop Now</span>
                  <ArrowRight size={11} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BRAND STRIP */}
      <section className="bg-[#1b1815] text-white py-14 px-5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { t: "Hand-Finished", s: "Every piece crafted with care" },
            { t: "Premium Fabrics", s: "Sourced from finest mills" },
            { t: "Free Shipping", s: "Orders above Rs. 5,000" },
            { t: "Easy Returns", s: "7-day hassle-free policy" },
          ].map((item, i) => (
            <div key={i}>
              <div className="w-8 h-px bg-[#bb9457] mx-auto mb-4" />
              <h4 className="text-[13px] tracking-[0.1em] uppercase mb-1.5" style={{ fontFamily: "var(--font-marcellus)" }}>{item.t}</h4>
              <p className="text-[11px] opacity-40 tracking-wide">{item.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 px-5 text-center">
        <p className="text-[#0e4d3b] text-[10px] tracking-[0.35em] uppercase mb-3">Stay Connected</p>
        <h2 className="text-[32px] lg:text-[40px] mb-3" style={{ fontFamily: "var(--font-marcellus)" }}>The SHAHANA Circle</h2>
        <p className="text-[13px] opacity-50 mb-8 max-w-sm mx-auto leading-relaxed">First access to new collections, exclusive offers, and styling inspiration.</p>
        <div className="flex max-w-md mx-auto">
          <input type="email" placeholder="Your email address" className="flex-1 border border-black/15 px-5 py-3.5 text-[13px] bg-transparent outline-none focus:border-[#0e4d3b] transition-colors" />
          <button className="bg-[#1b1815] text-white px-7 py-3.5 text-[11px] tracking-[0.2em] uppercase hover:bg-[#0e4d3b] transition-colors">
            Join
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111] text-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 pt-16 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
            <div className="col-span-2 md:col-span-1">
              <div className="text-xl tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "var(--font-marcellus)" }}>SHAHANA</div>
              <p className="text-[12px] leading-relaxed opacity-40 max-w-[200px]">Heritage luxury fashion for the modern Pakistani woman.</p>
            </div>
            {[
              { h: "Shop", links: ["New Arrivals", "Unstitched", "Luxury Collection", "Sale"] },
              { h: "Help", links: ["Track Order", "Returns", "FAQ", "Contact Us"] },
              { h: "Brand", links: ["About", "Lookbook", "Journal", "Careers"] },
            ].map(col => (
              <div key={col.h}>
                <h4 className="text-[10px] uppercase tracking-[0.25em] mb-5 opacity-40">{col.h}</h4>
                <ul className="space-y-3">
                  {col.links.map(l => (
                    <li key={l}><a href="#" className="text-[13px] opacity-60 hover:opacity-100 transition-opacity">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] opacity-30">
            <p>© 2026 SHAHANA. All rights reserved.</p>
            <p>Made with care in Pakistan 🇵🇰</p>
          </div>
        </div>
      </footer>

    </main>
  );
}