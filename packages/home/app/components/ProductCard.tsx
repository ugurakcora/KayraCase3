"use client";

import Image from "next/image";
import Link from "next/link";
import { Product, formatPrice, addToCart } from "@kayra-case/shared";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={`/product/${product.id}`}
        className="relative aspect-square w-full overflow-hidden bg-gray-100"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4 transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/product/${product.id}`} className="mb-2 flex-1">
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 hover:text-blue-600">
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="text-xs text-gray-600">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isAdding ? "Sepete Ekleniyor..." : "Sepete Ekle"}
          </button>
        </div>
      </div>
    </div>
  );
}
