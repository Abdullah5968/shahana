const products = [
  {
    id: 1,
    name: "Zara Embroidered Lawn 3-Piece",
    price: 6500,
    salePrice: null,
    color: "bg-pink-100",
    textColor: "text-pink-400",
  },
  {
    id: 2,
    name: "Alina Printed Stitched Kurti",
    price: 4200,
    salePrice: 3200,
    color: "bg-orange-100",
    textColor: "text-orange-400",
  },
  {
    id: 3,
    name: "Noor Chiffon Formal Dress",
    price: 9800,
    salePrice: null,
    color: "bg-purple-100",
    textColor: "text-purple-400",
  },
  {
    id: 4,
    name: "Sana Cotton Unstitched Suit",
    price: 3500,
    salePrice: 2800,
    color: "bg-teal-100",
    textColor: "text-teal-400",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-black text-white text-center text-xs sm:text-sm py-2 px-4 tracking-wide">
        Free delivery on orders above PKR 5,000 - Cash on Delivery available across Pakistan
      </div>

      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="text-2xl sm:text-3xl font-serif tracking-widest text-black">
            SHAHANA
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide text-gray-800">
            <a href="#" className="hover:text-black">New Arrivals</a>
            <a href="#" className="hover:text-black">Ready to Wear</a>
            <a href="#" className="hover:text-black">Unstitched</a>
            <a href="#" className="hover:text-black">Sale</a>
          </nav>
          <div className="flex items-center gap-5 text-gray-800">
            <span className="text-sm cursor-pointer">Search</span>
            <span className="text-sm cursor-pointer">Cart (0)</span>
          </div>
        </div>
      </header>

      <section className="bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <h1 className="text-4xl sm:text-6xl font-serif text-black tracking-tight">
            Timeless Elegance, Woven for You
          </h1>
          <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
            Discover SHAHANA new seasonal collection, crafted for the modern Pakistani woman.
          </p>
          <div className="mt-10">
            <a href="#" className="inline-block bg-black text-white px-8 py-3 text-sm tracking-wide hover:bg-gray-800 transition-colors">
              Shop New Arrivals
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-2xl sm:text-3xl font-serif text-center text-black mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <a href="#" className="group">
            <div className="aspect-[3/4] bg-rose-100 flex items-center justify-center overflow-hidden">
              <span className="text-rose-400 text-sm">Image</span>
            </div>
            <p className="mt-3 text-center text-sm tracking-wide text-gray-800 group-hover:text-black">
              Ready to Wear
            </p>
          </a>
          <a href="#" className="group">
            <div className="aspect-[3/4] bg-amber-100 flex items-center justify-center overflow-hidden">
              <span className="text-amber-500 text-sm">Image</span>
            </div>
            <p className="mt-3 text-center text-sm tracking-wide text-gray-800 group-hover:text-black">
              Unstitched
            </p>
          </a>
          <a href="#" className="group">
            <div className="aspect-[3/4] bg-emerald-100 flex items-center justify-center overflow-hidden">
              <span className="text-emerald-500 text-sm">Image</span>
            </div>
            <p className="mt-3 text-center text-sm tracking-wide text-gray-800 group-hover:text-black">
              Formal Wear
            </p>
          </a>
          <a href="#" className="group">
            <div className="aspect-[3/4] bg-zinc-200 flex items-center justify-center overflow-hidden">
              <span className="text-zinc-500 text-sm">Image</span>
            </div>
            <p className="mt-3 text-center text-sm tracking-wide text-gray-800 group-hover:text-black">
              Sale
            </p>
          </a>
        </div>
      </section>

      <section className="bg-zinc-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-serif text-center text-black mb-12">
            New Arrivals
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <a href="#" key={product.id} className="group block">
                <div className={`aspect-[3/4] ${product.color} flex items-center justify-center overflow-hidden`}>
                  <span className={`${product.textColor} text-sm`}>Image</span>
                </div>
                <p className="mt-3 text-sm text-gray-800 group-hover:text-black">
                  {product.name}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  {product.salePrice ? (
                    <>
                      <span className="text-sm font-medium text-black">
                        PKR {product.salePrice.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        PKR {product.price.toLocaleString()}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-medium text-black">
                      PKR {product.price.toLocaleString()}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-black text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <div className="text-xl font-serif tracking-widest text-white mb-4">
              SHAHANA
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium Pakistani women fashion. Elegant, modern, and made for you.
            </p>
          </div>

          <div>
            <h3 className="text-white text-sm font-medium mb-4 tracking-wide">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white">Ready to Wear</a></li>
              <li><a href="#" className="hover:text-white">Unstitched</a></li>
              <li><a href="#" className="hover:text-white">Sale</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-medium mb-4 tracking-wide">Help</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Track Order</a></li>
              <li><a href="#" className="hover:text-white">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white">Return and Exchange</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-medium mb-4 tracking-wide">Get in Touch</h3>
            <p className="text-sm text-gray-400 mb-3">
              Cash on Delivery available across Pakistan
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300">
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
    </div>
  );
}