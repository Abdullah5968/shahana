import { prisma } from "@/lib/db";
import SiteHeader from "@/components/SiteHeader";

const categories = [
  { name: "Ready to Wear", from: "from-rose-200", to: "to-rose-400" },
  { name: "Unstitched", from: "from-amber-200", to: "to-amber-400" },
  { name: "Formal Wear", from: "from-emerald-200", to: "to-emerald-400" },
  { name: "Sale", from: "from-zinc-300", to: "to-zinc-500" },
];

const marqueeItems = [
  "Free delivery on orders above PKR 5,000",
  "Cash on Delivery across Pakistan",
  "New Winter Collection is Here",
  "Handcrafted for the Modern Pakistani Woman",
];

export default async function Home() {
  const products = await prisma.product.findMany({
    where: { isNew: true },
    take: 4,
  });

  return (
    <div className="min-h-screen bg-ivory">
      <MarqueeBar />
      <SiteHeader />
      <HeroSection />
      <CategorySection />
      <NewArrivalsSection products={products} />
      <BestsellersSection />
      <SiteFooter />
    </div>
  );
}

function MarqueeBar() {
  return (
    <div className="bg-maroon text-white overflow-hidden py-2.5">
      <div className="flex whitespace-nowrap animate-marquee">
        <MarqueeRow />
        <MarqueeRow />
      </div>
    </div>
  );
}

function MarqueeRow() {
  return (
    <div className="flex shrink-0">
      {marqueeItems.map((text, j) => (
        <span key={j} className="mx-8 text-xs sm:text-sm tracking-wide flex items-center gap-8">
          {text}
<span className="text-gold">&#10022;</span>
        </span>
      ))}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="gradient-hero absolute inset-0 opacity-90" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-40 text-center">
        <p className="text-gold text-xs sm:text-sm tracking-[0.3em] mb-6">
          AUTUMN / WINTER 2026
        </p>
        <h1 className="text-5xl sm:text-7xl font-serif text-white tracking-tight leading-[1.05]">
          Timeless Elegance, Woven for You
        </h1>
        <p className="mt-8 text-base sm:text-lg text-white/85 max-w-xl mx-auto">
          Discover SHAHANA new seasonal collection, crafted for the modern Pakistani woman.
        </p>
        <div className="mt-10">
          <a href="#new-arrivals" className="hero-cta">
            Shop New Arrivals
          </a>
        </div>
      </div>
    </section>
  );
}

function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <p className="text-maroon text-xs tracking-[0.3em] mb-3">EXPLORE</p>
        <h2 className="text-3xl sm:text-4xl font-serif text-charcoal">
          Shop by Category
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <CategoryCard key={cat.name} cat={cat} />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ cat }: { cat: { name: string; from: string; to: string } }) {
  return (
    <a href="#" className="cat-card">
      <div className={`cat-image bg-gradient-to-br ${cat.from} ${cat.to}`}>
        <span className="cat-label">{cat.name}</span>
      </div>
      <div className="cat-overlay" />
    </a>
  );
}

type ProductType = {
  id: string;
  name: string;
  price: number;
  salePrice: number | null;
};

function NewArrivalsSection({ products }: { products: ProductType[] }) {
  return (
    <section id="new-arrivals" className="bg-blush py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-maroon text-xs tracking-[0.3em] mb-3">JUST DROPPED</p>
          <h2 className="text-3xl sm:text-4xl font-serif text-charcoal">
            New Arrivals
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
async function BestsellersSection() {
  const allProducts = await prisma.product.findMany({ take: 10 });
  const doubled = allProducts.concat(allProducts);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-maroon text-xs tracking-[0.3em] mb-3">CUSTOMER FAVOURITES</p>
          <h2 className="text-3xl sm:text-4xl font-serif text-charcoal">Bestsellers</h2>
        </div>
      </div>
      <div className="auto-scroll-wrap">
        <div className="auto-scroll-track">
          {doubled.map((product, i) => (
            <BestsellerCard key={i} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BestsellerCard({ product }: { product: ProductType }) {
  const price = product.salePrice ?? product.price;
  return (
    <a href={`/product/${product.id}`} className="auto-scroll-card group block">
      <div className="relative aspect-[3/4] bg-blush overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
          Image
        </div>
        {product.salePrice && <span className="sale-badge">SALE</span>}
      </div>
      <p className="product-name">{product.name}</p>
      <span className="text-sm font-medium text-charcoal">
        PKR {price.toLocaleString()}
      </span>
    </a>
  );
}
function ProductCard({ product }: { product: ProductType }) {
  return (
    <a href={`/product/${product.id}`} className="group block">
      <div className="product-image">
        <div className="product-image-inner">Image</div>
        {product.salePrice && <span className="sale-badge">SALE</span>}
      </div>
      <p className="product-name">{product.name}</p>
      <div className="mt-1 flex items-center gap-2">
        {product.salePrice ? (
          <>
            <span className="text-sm font-medium text-maroon">
              PKR {product.salePrice.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 line-through">
              PKR {product.price.toLocaleString()}
            </span>
          </>
        ) : (
          <span className="text-sm font-medium text-charcoal">
            PKR {product.price.toLocaleString()}
          </span>
        )}
      </div>
    </a>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-charcoal text-gray-300">
      <div className="footer-grid">
        <div>
          <div className="text-xl font-serif tracking-widest text-white mb-4">
            SHAHANA
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Premium Pakistani women fashion. Elegant, modern, and made for you.
          </p>
        </div>
        <FooterCol title="Shop" links={["New Arrivals", "Ready to Wear", "Unstitched", "Sale"]} />
        <FooterCol
          title="Help"
          links={["Track Order", "Shipping Policy", "Return and Exchange", "FAQ", "Contact Us"]}
        />
        <div>
          <h3 className="text-white text-sm font-medium mb-4 tracking-wide">
            Get in Touch
          </h3>
          <p className="text-sm text-gray-400 mb-3">
            Cash on Delivery available across Pakistan
          </p>
          <a href="#" className="whatsapp-link">
            WhatsApp Us
          </a>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6">
        <p className="text-center text-xs text-gray-500">
          Copyright 2026 SHAHANA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="text-white text-sm font-medium mb-4 tracking-wide">
        {title}
      </h3>
      <ul className="space-y-2 text-sm text-gray-400">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="hover:text-gold">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}