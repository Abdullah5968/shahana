"use client";

import { motion } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "New Arrivals", href: "#" },
  { label: "Unstitched", href: "#" },
  { label: "Luxury Collection", href: "#" },
  { label: "Eid Collection", href: "#" },
  { label: "Sale", href: "#" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-shahana-ivory text-shahana-ink">
      <div className="bg-shahana-ink text-shahana-ivory text-center text-xs tracking-[0.2em] uppercase py-2.5 px-4">
        Complimentary shipping across Pakistan on orders above Rs. 5,000
      </div>

      <header className="sticky top-0 z-50 bg-shahana-ivory/90 backdrop-blur-md border-b border-shahana-ink/10">
        <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-5">
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="hidden lg:flex items-center gap-8 text-[13px] tracking-wide uppercase">
            {navLinks.slice(0, 3).map((link) => (
              <a key={link.label} href={link.href} className="hover:text-shahana-emerald transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          
            <a
           href="/"
            className="font-display text-3xl tracking-[0.15em] absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0"
          >
            SHAHANA
          </a>

          <div className="flex items-center gap-5">
            <div className="hidden lg:flex items-center gap-8 text-[13px] tracking-wide uppercase mr-4">
              {navLinks.slice(3).map((link) => (
                <a key={link.label} href={link.href} className="hover:text-shahana-emerald transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
            <button aria-label="Search"><Search size={19} /></button>
            <button aria-label="Account" className="hidden sm:inline"><User size={19} /></button>
            <button aria-label="Wishlist"><Heart size={19} /></button>
            <button aria-label="Bag" className="relative">
              <ShoppingBag size={19} />
              <span className="absolute -top-2 -right-2 bg-shahana-emerald text-shahana-ivory text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="lg:hidden flex flex-col gap-4 px-6 pb-6 text-sm uppercase tracking-wide">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-shahana-ivory via-shahana-ivory to-[#EFE6D8]" />
        <div className="absolute -top-40 -right-40 w-[36rem] h-[36rem] rounded-full bg-shahana-emerald/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-shahana-gold/15 blur-3xl" />

        <svg
          className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-[0.07]"
          width="900" height="500" viewBox="0 0 900 500" fill="none"
        >
          <path d="M50 500V250C50 112 200 20 450 20C700 20 850 112 850 250V500" stroke="#0E4D3B" strokeWidth="2" />
          <path d="M150 500V270C150 160 270 90 450 90C630 90 750 160 750 270V500" stroke="#BB9457" strokeWidth="1.5" />
        </svg>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-shahana-emerald text-xs tracking-[0.3em] uppercase mb-6"
          >
            Eid Collection 2026 — Now Live
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.1] mb-6"
          >
            Heritage, <span className="italic text-shahana-emerald">Reimagined.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-shahana-ink/70 max-w-xl mx-auto mb-10"
          >
            Hand-finished luxury fashion for the modern Pakistani woman — where royal craftsmanship meets contemporary minimalism.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#" className="bg-shahana-emerald text-shahana-ivory px-8 py-3.5 text-sm uppercase tracking-wider hover:bg-shahana-emerald-dark transition-colors">
              Shop New Arrivals
            </a>
            <a href="#" className="border border-shahana-ink/30 px-8 py-3.5 text-sm uppercase tracking-wider hover:border-shahana-ink transition-colors">
              Explore Collections
            </a>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-px h-12 bg-shahana-ink/30"
        />
      </section>
      {/* NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-shahana-emerald text-xs tracking-[0.3em] uppercase mb-2">Just In</p>
            <h2 className="font-display text-4xl">New Arrivals</h2>
          </div>
          <a href="#" className="text-sm uppercase tracking-wider border-b border-shahana-ink pb-0.5 hover:text-shahana-emerald hover:border-shahana-emerald transition-colors">
            View All
          </a>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[
            { name: "Izaar Luxury Lawn", price: "Rs. 8,500", old: "Rs. 10,500", tag: "New" },
            { name: "Noor Embroidered 3-Pc", price: "Rs. 14,200", old: null, tag: "Bestseller" },
            { name: "Gulshan Printed Lawn", price: "Rs. 6,800", old: "Rs. 8,000", tag: "Sale" },
            { name: "Rania Chiffon Dupatta Set", price: "Rs. 18,500", old: null, tag: "Luxury" },
          ].map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] bg-[#EDE8E0] mb-4 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center opacity-30">
                    <div className="w-16 h-16 mx-auto mb-2 border border-shahana-ink/20 rounded-full flex items-center justify-center">
                      <span className="font-display text-xs">S</span>
                    </div>
                    <p className="text-xs tracking-widest uppercase">Image</p>
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 ${product.tag === "Sale" ? "bg-shahana-maroon text-white" : product.tag === "Luxury" ? "bg-shahana-gold text-white" : "bg-shahana-emerald text-white"}`}>
                    {product.tag}
                  </span>
                </div>
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart size={14} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-shahana-ink text-shahana-ivory text-center text-xs uppercase tracking-wider py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  Add to Cart
                </div>
              </div>
              <h3 className="text-sm font-medium mb-1">{product.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm">{product.price}</span>
                {product.old && <span className="text-xs text-shahana-ink/40 line-through">{product.old}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COLLECTIONS GRID */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="text-center mb-12">
          <p className="text-shahana-emerald text-xs tracking-[0.3em] uppercase mb-2">Explore</p>
          <h2 className="font-display text-4xl">Our Collections</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Luxury Lawn", sub: "Summer 2026", span: "md:col-span-2 md:row-span-2", height: "h-[480px]" },
            { name: "Festive Wear", sub: "Eid Collection", span: "", height: "h-56" },
            { name: "Chiffon Edit", sub: "Evening Wear", span: "", height: "h-56" },
          ].map((col, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`${col.span} ${col.height} relative group cursor-pointer overflow-hidden bg-[#E8E1D8]`}
            >
              <div className="absolute inset-0 bg-shahana-ink/20 group-hover:bg-shahana-ink/30 transition-colors duration-500" />
              <div className="absolute bottom-6 left-6">
                <p className="text-shahana-ivory/70 text-xs tracking-widest uppercase mb-1">{col.sub}</p>
                <h3 className="font-display text-shahana-ivory text-2xl">{col.name}</h3>
                <div className="w-0 group-hover:w-12 h-px bg-shahana-gold transition-all duration-500 mt-2" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY SHAHANA */}
      <section className="bg-shahana-ink text-shahana-ivory py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: "✦", title: "Hand-Finished", sub: "Every piece crafted with care" },
              { icon: "◈", title: "Premium Fabrics", sub: "Sourced from finest mills" },
              { icon: "⟡", title: "Free Shipping", sub: "On orders above Rs. 5,000" },
              { icon: "◇", title: "Easy Returns", sub: "7-day hassle-free returns" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <span className="text-shahana-gold text-2xl">{item.icon}</span>
                <h4 className="font-display text-lg">{item.title}</h4>
                <p className="text-shahana-ivory/50 text-xs tracking-wide">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 px-6 text-center">
        <p className="text-shahana-emerald text-xs tracking-[0.3em] uppercase mb-3">Stay Connected</p>
        <h2 className="font-display text-4xl mb-4">Join the SHAHANA Circle</h2>
        <p className="text-shahana-ink/60 text-sm mb-8 max-w-md mx-auto">Be the first to know about new collections, exclusive offers, and styling inspiration.</p>
        <div className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 border border-shahana-ink/20 px-5 py-3.5 text-sm bg-transparent outline-none focus:border-shahana-emerald transition-colors"
          />
          <button className="bg-shahana-emerald text-shahana-ivory px-8 py-3.5 text-xs uppercase tracking-wider hover:bg-shahana-emerald-dark transition-colors">
            Subscribe
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-shahana-ink text-shahana-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-display text-2xl tracking-[0.15em] mb-4">SHAHANA</h3>
            <p className="text-shahana-ivory/50 text-xs leading-relaxed max-w-xs">Heritage luxury fashion for the modern Pakistani woman.</p>
          </div>
          {[
            { title: "Shop", links: ["New Arrivals", "Unstitched", "Luxury Collection", "Sale"] },
            { title: "Help", links: ["Track Order", "Returns", "FAQ", "Contact Us"] },
            { title: "Brand", links: ["About", "Lookbook", "Fashion Journal", "Careers"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-widest mb-5 text-shahana-ivory/60">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}><a href="#" className="text-sm text-shahana-ivory/70 hover:text-shahana-ivory transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-shahana-ivory/10 max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-shahana-ivory/40">
          <p>© 2026 SHAHANA. All rights reserved.</p>
          <p>Made with care in Pakistan</p>
        </div>
      </footer>
    </main>
  );
}