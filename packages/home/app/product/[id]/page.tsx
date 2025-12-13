import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/lib/api";
import { formatPrice, addToCart } from "@kayra-case/shared";
import AddToCartButton from "./AddToCartButton";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white p-8 shadow-md">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 text-sm text-gray-600">
                  {product.rating.rate} ({product.rating.count} değerlendirme)
                </span>
              </div>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                {product.category}
              </span>
            </div>

            <div className="mt-6">
              <span className="text-4xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Açıklama</h2>
              <p className="mt-2 text-gray-700">{product.description}</p>
            </div>

            <div className="mt-8">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
