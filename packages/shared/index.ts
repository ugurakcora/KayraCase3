// Shared types
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

// Shared utilities
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(price);
};

// Cart storage utilities
export const CART_STORAGE_KEY = "kayra-case-cart";

export const getCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const cart = localStorage.getItem(CART_STORAGE_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const saveCartToStorage = (cart: CartItem[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

export const addToCart = (product: Product, quantity: number = 1): void => {
  const cart = getCartFromStorage();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  saveCartToStorage(cart);
  // Custom event dispatch for cross-app communication
  window.dispatchEvent(new CustomEvent("cart-updated", { detail: cart }));
};

export const removeFromCart = (productId: number): void => {
  const cart = getCartFromStorage().filter((item) => item.id !== productId);
  saveCartToStorage(cart);
  window.dispatchEvent(new CustomEvent("cart-updated", { detail: cart }));
};

export const updateCartItemQuantity = (
  productId: number,
  quantity: number
): void => {
  const cart = getCartFromStorage();
  const item = cart.find((item) => item.id === productId);

  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      saveCartToStorage(cart);
      window.dispatchEvent(new CustomEvent("cart-updated", { detail: cart }));
    }
  }
};

export const getCartTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getCartItemCount = (cart: CartItem[]): number => {
  return cart.reduce((count, item) => count + item.quantity, 0);
};
