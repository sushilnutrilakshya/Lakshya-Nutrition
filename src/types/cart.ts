// ── Cart Types ──────────────────────────────────────────────────

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  title: string;
  variantTitle: string;
  price: number;
  compareAtPrice?: number | undefined;
  quantity: number;
  imageUrl: string;
  slug: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  discount?: number | undefined;
  couponCode?: string | undefined;
  shippingFee: number;
  gst: number;
}

export interface CartStore {
  cart: Cart;
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  applyCoupon: (code: string) => void;
}
