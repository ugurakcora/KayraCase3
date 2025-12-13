"use client";

import { Product, addToCart } from "@kayra-case/shared";
import { useState } from "react";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, 1);
    setShowToast(true);

    setTimeout(() => {
      setIsAdding(false);
      setShowToast(false);
    }, 2000);
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className="w-full rounded-md bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isAdding ? "Sepete Ekleniyor..." : "Sepete Ekle"}
      </button>

      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg">
          Ürün sepete eklendi! 🎉
        </div>
      )}
    </>
  );
}
