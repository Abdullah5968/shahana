"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

type Props = {
  id: string;
  name: string;
  price: number;
  salePrice: number | null;
  sizes: string[];
};

export default function AddToCartSection({ id, name, price, salePrice, sizes }: Props) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }
    addItem({
      id,
      name,
      price: salePrice ?? price,
      size: selectedSize,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <>
      <div className="mb-8">
        <p className="text-sm font-medium text-black mb-3">Select Size</p>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`border px-4 py-2 text-sm transition-colors ${
                selectedSize === size
                  ? "border-black bg-black text-white"
                  : "border-gray-300 hover:border-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-black text-white py-3 text-sm tracking-wide hover:bg-gray-800 transition-colors mb-4"
      >
        {added ? "Added to Cart ✓" : "Add to Cart"}
      </button>
    </>
  );
}