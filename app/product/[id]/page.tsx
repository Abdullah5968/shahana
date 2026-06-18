"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag, ArrowLeft, Star, Truck, RotateCcw, Shield, ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const products: Record<number, {
  id: number; name: string; sku: string; price: number; old: number | null;
  tag: string; fabric: string; description: string; category: string;
}> = {
  1: { id: 1, name: "Izaar Luxury Lawn", sku: "SH-2026-001", price: 8500, old: 10500, tag: "New", fabric: "Premium Lawn", description: "A graceful 3-piece unstitched lawn suit featuring delicate digital print on the shirt, coordinated printed lawn dupatta and trouser. Crafted from our finest summer-weight lawn fabric.", category: "Lawn" },
  2: { id: 2, name: "Noor Embroidered 3-Pc", sku: "SH-2026-002", price: 14200, old: null, tag: "Bestseller", fabric: "Embroidered Lawn", description: "An exquisite 3-piece embroidered suit with intricate threadwork on premium lawn fabric. Features a gorgeous embroidered chiffon dupatta with handcrafted borders.", category: "Embroidered" },
  3: { id: 3, name: "Gulshan Printed Lawn", sku: "SH-2026-003", price: 6800, old: 8000, tag: "Sale", fabric: "Digital Lawn", description: "Vibrant floral digital print on lightweight lawn. A breezy summer essential with matching printed dupatta and trouser fabric.", category: "Lawn" },
  4: { id: 4, name: "Rania Chiffon Set", sku: "SH-2026-004", price: 18500, old: null, tag: "Luxury", fabric: "Pure Chiffon", description: "Opulent pure chiffon 3-piece suit with handcrafted embellishments. Flowing silhouette with intricate embroidery at hem and neckline — crafted for evenings that demand presence.", category: "Chiffon" },
};

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["#E8DDD0", "#C4B8A8", "#8C7B6E", "#4A3728", "#0e4d3b", "#6b1f2a"];

const bgColors: Record<number, string> = {
  1: "#EDE8E0", 2: "#E4DCd0", 3: "#E8E0D4", 4: "#DDD5C8",
};

const tagColors: Record<string, string> = {
  Sale: "#6b1f2a", Luxury: "#bb9457", Bestseller: "#1b1815", New: "#0e4d3b",
};

const relatedProducts = [
  { id: 2, name: "Noor Embroidered 3-Pc", price: 14200, tag: "Bestseller" },
  { id: 3, name: "Gulshan Printed Lawn", price: 6800, old: 8000, tag: "Sale" },
  { id: 4, name: "Rania Chiffon Set", price: 18500, tag: "Luxury" },
  { id: 1, name: "Izaar Luxury Lawn", price: 8500, old: 10500, tag: "New" },
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id);
  const product = products[productId] || products[1];

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "care" | "shipping">("details");
  const [activeImage, setActiveImage] = useState(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const bg = bgColors[productId] || "#EDE8E0";
  const tagColor = tagColors[product.tag] || "#1b1815";

  return (
    <main className="min-h-screen" style={{ background: "#FAF7F3", color: "#1b1815", fontFamily: "var(--font-inter)" }}>

      {/* Top bar */}
      <div style={{ background: "#1b1815", color: "white" }} className="text-center text-[11px] tracking-[0.25em] uppercase py-2.5">
        Free shipping on orders above Rs. 5,000
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b backdrop-blur-md px-5 lg:px-10 py-4 flex items-center justify-between"
        style={{ background: "rgba(250,247,243,0.95)", borderColor: "rgba(27,24,21,0.08)" }}>
        <Link href="/" style={{ fontFamily: "var(--font-marcellus)" }} className="text-xl tracking-[0.2em] uppercase">SHAHANA</Link>
        <div className="flex items-center gap-5">
          <Link href="/shop" className="flex items-center gap-1.5 text-[12px] uppercase tracking-wider opacity-50 hover:opacity-100 transition-opacity">
            <ArrowLeft size={13} /> Shop
          </Link>
          <button className="relative">
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span className="absolute -top-1.5 -right-1.5 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center"
              style={{ background: "#0e4d3b" }}>0</span>
          </button>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 pt-5 pb-2">
        <p className="text-[11px] opacity-30 uppercase tracking-wider">
          <Link href="/" className="hover:opacity-70">Home</Link> / <Link href="/shop" className="hover:opacity-70">Shop</Link> / {product.category} / {product.name}
        </p>
      </div>

      {/* Main product section */}
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Images */}
          <div className="flex gap-3">
            {/* Thumbnails */}
            <div className="hidden sm:flex flex-col gap-2 w-16">
              {[0, 1, 2, 3].map(i => (
                <button key={i} onClick={() => setActiveImage(i)}
                  className="aspect-square flex items-center justify-center border-2 transition-all"
                  style={{
                    background: bg,
                    borderColor: activeImage === i ? "#1b1815" : "transparent",
                  }}>
                  <span style={{ fontFamily: "var(--font-marcellus)" }} className="text-xs opacity-20">S</span>
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 relative aspect-[3/4] overflow-hidden" style={{ background: bg }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center opacity-15">
                  <div className="w-24 h-24 border border-current rounded-full flex items-center justify-center mx-auto mb-3">
                    <span style={{ fontFamily: "var(--font-marcellus)" }} className="text-3xl">S</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest">{product.fabric}</p>
                </div>
              </div>
              {/* Tag */}
              <div className="absolute top-4 left-4">
                <span className="text-[10px] uppercase tracking-wider px-3 py-1.5 font-medium text-white"
                  style={{ background: tagColor }}>{product.tag}</span>
              </div>
              {/* Wishlist */}
              <button onClick={() => setWishlisted(!wishlisted)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                <Heart size={16} strokeWidth={1.5}
                  fill={wishlisted ? "#6b1f2a" : "none"}
                  stroke={wishlisted ? "#6b1f2a" : "#1b1815"} />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-30 mb-2">{product.sku}</p>
              <h1 style={{ fontFamily: "var(--font-marcellus)" }} className="text-[32px] lg:text-[40px] leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={12} fill={s <= 4 ? "#bb9457" : "none"} stroke="#bb9457" />
                  ))}
                </div>
                <span className="text-[12px] opacity-40">4.0 (24 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[26px] font-light">Rs. {product.price.toLocaleString()}</span>
                {product.old && (
                  <span className="text-[16px] opacity-30 line-through">Rs. {product.old.toLocaleString()}</span>
                )}
                {product.old && (
                  <span className="text-[11px] px-2 py-0.5 font-medium text-white" style={{ background: "#6b1f2a" }}>
                    {Math.round((1 - product.price / product.old) * 100)}% OFF
                  </span>
                )}
              </div>

              <p className="text-[13px] leading-relaxed opacity-60 mb-6">{product.description}</p>

              {/* Color */}
              <div className="mb-5">
                <p className="text-[11px] uppercase tracking-[0.2em] mb-3">
                  Colour <span className="opacity-40 ml-2">{selectedColor ? "Selected" : "— Choose"}</span>
                </p>
                <div className="flex gap-2">
                  {colors.map(c => (
                    <button key={c} onClick={() => setSelectedColor(c)}
                      className="w-8 h-8 rounded-full border-2 transition-all"
                      style={{
                        background: c,
                        borderColor: selectedColor === c ? "#1b1815" : "transparent",
                        outline: selectedColor === c ? "1px solid #1b1815" : "none",
                        outlineOffset: 2,
                      }} />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] uppercase tracking-[0.2em]">
                    Size <span className="opacity-40 ml-2">{selectedSize || "— Choose"}</span>
                  </p>
                  <button onClick={() => setSizeGuideOpen(!sizeGuideOpen)}
                    className="text-[10px] uppercase tracking-wider opacity-40 hover:opacity-100 flex items-center gap-1 transition-opacity">
                    Size Guide <ChevronDown size={11} className={sizeGuideOpen ? "rotate-180" : ""} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)}
                      className="w-12 h-10 text-[12px] border transition-all"
                      style={{
                        background: selectedSize === s ? "#1b1815" : "transparent",
                        color: selectedSize === s ? "white" : "#1b1815",
                        borderColor: selectedSize === s ? "#1b1815" : "rgba(27,24,21,0.2)",
                      }}>
                      {s}
                    </button>
                  ))}
                </div>
                {sizeGuideOpen && (
                  <div className="mt-3 p-4 text-[12px] opacity-60 border" style={{ borderColor: "rgba(27,24,21,0.1)" }}>
                    XS: 32–34 · S: 34–36 · M: 36–38 · L: 38–40 · XL: 40–42 · XXL: 42–44
                  </div>
                )}
              </div>

              {/* Qty + Add to Cart */}
              <div className="flex gap-3 mb-5">
                <div className="flex border" style={{ borderColor: "rgba(27,24,21,0.2)" }}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-11 h-12 flex items-center justify-center text-lg hover:bg-black/5 transition-colors">−</button>
                  <div className="w-12 h-12 flex items-center justify-center text-[13px] border-x"
                    style={{ borderColor: "rgba(27,24,21,0.2)" }}>{qty}</div>
                  <button onClick={() => setQty(q => q + 1)}
                    className="w-11 h-12 flex items-center justify-center text-lg hover:bg-black/5 transition-colors">+</button>
                </div>
                <button onClick={handleAddToCart}
                  className="flex-1 h-12 text-[12px] uppercase tracking-[0.2em] text-white transition-colors"
                  style={{ background: addedToCart ? "#0e4d3b" : "#1b1815" }}>
                  {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
                </button>
              </div>

              <button className="w-full h-12 text-[12px] uppercase tracking-[0.2em] border-2 mb-8 hover:bg-[#1b1815] hover:text-white transition-all"
                style={{ borderColor: "#1b1815" }}>
                Buy Now
              </button>

              {/* Trust strip */}
              <div className="grid grid-cols-3 gap-3 py-5 border-y" style={{ borderColor: "rgba(27,24,21,0.08)" }}>
                {[
                  { icon: <Truck size={15} />, text: "Free Delivery\nAbove Rs. 5,000" },
                  { icon: <RotateCcw size={15} />, text: "7-Day\nEasy Returns" },
                  { icon: <Shield size={15} />, text: "Authentic\nGuarantee" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 text-center">
                    <div className="opacity-40">{item.icon}</div>
                    <p className="text-[10px] uppercase tracking-wide opacity-40 whitespace-pre-line leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="flex border-b mb-8" style={{ borderColor: "rgba(27,24,21,0.1)" }}>
            {(["details", "care", "shipping"] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="px-6 py-3 text-[11px] uppercase tracking-[0.2em] border-b-2 transition-all"
                style={{
                  borderColor: activeTab === tab ? "#1b1815" : "transparent",
                  opacity: activeTab === tab ? 1 : 0.4,
                }}>
                {tab === "details" ? "Product Details" : tab === "care" ? "Care Guide" : "Shipping Info"}
              </button>
            ))}
          </div>
          <div className="max-w-2xl text-[13px] leading-relaxed opacity-60">
            {activeTab === "details" && (
              <div className="space-y-3">
                <p><span className="uppercase tracking-wider opacity-70 text-[11px]">Fabric:</span> {product.fabric}</p>
                <p><span className="uppercase tracking-wider opacity-70 text-[11px]">Pieces:</span> 3-Piece (Shirt, Trouser, Dupatta)</p>
                <p><span className="uppercase tracking-wider opacity-70 text-[11px]">Type:</span> Unstitched</p>
                <p><span className="uppercase tracking-wider opacity-70 text-[11px]">Category:</span> {product.category}</p>
                <p><span className="uppercase tracking-wider opacity-70 text-[11px]">SKU:</span> {product.sku}</p>
              </div>
            )}
            {activeTab === "care" && (
              <div className="space-y-2">
                <p>• Hand wash in cold water with mild detergent</p>
                <p>• Do not bleach or tumble dry</p>
                <p>• Iron on low heat with a pressing cloth</p>
                <p>• Store in cool, dry place away from direct sunlight</p>
                <p>• Dry clean recommended for embroidered pieces</p>
              </div>
            )}
            {activeTab === "shipping" && (
              <div className="space-y-2">
                <p>• Standard delivery: 3–5 business days across Pakistan</p>
                <p>• Express delivery: 1–2 business days available</p>
                <p>• Free shipping on orders above Rs. 5,000</p>
                <p>• Cash on Delivery available nationwide</p>
                <p>• Tracking link sent via SMS/WhatsApp upon dispatch</p>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        <div className="mt-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: "#0e4d3b" }}>You May Also Like</p>
              <h2 style={{ fontFamily: "var(--font-marcellus)" }} className="text-[28px]">Related Products</h2>
            </div>
            <Link href="/shop" className="text-[11px] uppercase tracking-wider opacity-40 hover:opacity-100 transition-opacity">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {relatedProducts.filter(p => p.id !== productId).slice(0, 4).map((p, i) => (
              <motion.div key={p.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group">
                <Link href={`/product/${p.id}`}>
                  <div className="relative aspect-[3/4] mb-3 overflow-hidden"
                    style={{ background: bgColors[p.id] || "#EDE8E0" }}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-15">
                      <div className="w-12 h-12 border border-current rounded-full flex items-center justify-center">
                        <span style={{ fontFamily: "var(--font-marcellus)" }} className="text-sm">S</span>
                      </div>
                    </div>
                    <span className="absolute top-3 left-3 text-[9px] uppercase tracking-wider px-2 py-1 text-white font-medium"
                      style={{ background: tagColors[p.tag] || "#1b1815" }}>{p.tag}</span>
                    <div className="absolute bottom-0 inset-x-0 text-white text-center text-[10px] tracking-[0.2em] uppercase py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                      style={{ background: "#1b1815" }}>Quick View</div>
                  </div>
                  <h3 className="text-[13px] font-medium mb-1">{p.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px]">Rs. {p.price.toLocaleString()}</span>
                    {"old" in p && p.old && <span className="text-[11px] opacity-30 line-through">Rs. {(p as { old: number }).old.toLocaleString()}</span>}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: "#111", color: "white" }} className="mt-16 py-8 text-center">
        <p style={{ fontFamily: "var(--font-marcellus)" }} className="text-lg tracking-[0.2em] mb-2">SHAHANA</p>
        <p className="text-[11px] opacity-30">© 2026 SHAHANA. All rights reserved.</p>
      </footer>
    </main>
  );
}