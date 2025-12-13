import { Product } from "@kayra-case/shared";

const API_BASE_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      next: { revalidate: 60 }, // ISR: 60 saniye cache
    });

    if (!response.ok) {
      throw new Error("Ürünler yüklenemedi");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProductById(id: number): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      next: { revalidate: 60 }, // ISR: 60 saniye cache
    });

    if (!response.ok) {
      throw new Error("Ürün bulunamadı");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}
