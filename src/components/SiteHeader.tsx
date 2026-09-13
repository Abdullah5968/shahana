"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function SiteHeader() {
  const { totalItems } = useCart();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand-logo">
          <span className="brand-ornament">&#10022;</span>
          SHAHANA
          <span className="brand-ornament">&#10022;</span>
        </Link>
        <nav className="site-nav">
          <a href="#" className="site-nav-link">New Arrivals</a>
          <a href="#" className="site-nav-link">Ready to Wear</a>
          <a href="#" className="site-nav-link">Unstitched</a>
          <a href="#" className="site-nav-link">Sale</a>
        </nav>
        <div className="site-header-actions">
          <span className="site-header-icon">Search</span>
          <Link href="/cart" className="site-header-icon">
            Cart ({totalItems})
          </Link>
        </div>
      </div>
    </header>
  );
}