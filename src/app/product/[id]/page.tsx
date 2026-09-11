import { prisma } from "@/lib/db";
import SiteHeader from "@/components/SiteHeader";
import { notFound } from "next/navigation";
import AddToCartSection from "@/components/AddToCartSection";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
            <SiteHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">Product Image</span>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
              {product.category}
            </p>
            <h1 className="text-2xl sm:text-3xl font-serif text-black mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              {product.salePrice ? (
                <>
                  <span className="text-xl font-medium text-black">
                    PKR {product.salePrice.toLocaleString()}
                  </span>
                  <span className="text-base text-gray-400 line-through">
                    PKR {product.price.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-xl font-medium text-black">
                  PKR {product.price.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            <AddToCartSection
              id={product.id}
              name={product.name}
              price={product.price}
              salePrice={product.salePrice}
              sizes={product.sizes}
            />

            <div className="border-t border-gray-200 pt-6 mt-6 space-y-2 text-sm text-gray-600">
              <p>SKU: {product.sku}</p>
              <p>Stock: {product.stock > 0 ? `${product.stock} available` : "Out of stock"}</p>
              <p>Cash on Delivery available across Pakistan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}