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
    </div>
  );
}