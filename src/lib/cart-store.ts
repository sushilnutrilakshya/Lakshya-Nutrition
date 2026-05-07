import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartStore, CartItem } from "@/types/cart";
import { generateId, cartItemCount } from "@/lib/utils";
import { SHIPPING_THRESHOLD, GST_RATE } from "@/lib/constants";

const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal >= SHIPPING_THRESHOLD ? 0 : 99;
  const gst = Math.round(subtotal * GST_RATE);
  const total = subtotal + shippingFee;
  return { subtotal, shippingFee, gst, total };
};

const emptyCart = () => ({
  id: generateId(),
  items: [] as CartItem[],
  subtotal: 0,
  total: 0,
  shippingFee: 0,
  gst: 0,
  discount: undefined,
  couponCode: undefined,
});

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: emptyCart(),
      isOpen: false,

      addItem: (newItem) => {
        const { cart } = get();
        const existing = cart.items.find((i) => i.variantId === newItem.variantId);
        let updatedItems: CartItem[];

        if (existing) {
          updatedItems = cart.items.map((i) =>
            i.variantId === newItem.variantId
              ? { ...i, quantity: i.quantity + newItem.quantity }
              : i
          );
        } else {
          updatedItems = [...cart.items, { ...newItem, id: generateId() }];
        }

        const totals = calculateTotals(updatedItems);
        set({ cart: { ...cart, items: updatedItems, ...totals }, isOpen: true });
      },

      removeItem: (itemId) => {
        const { cart } = get();
        const updatedItems = cart.items.filter((i) => i.id !== itemId);
        const totals = calculateTotals(updatedItems);
        set({ cart: { ...cart, items: updatedItems, ...totals } });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity < 1) return;
        const { cart } = get();
        const updatedItems = cart.items.map((i) =>
          i.id === itemId ? { ...i, quantity } : i
        );
        const totals = calculateTotals(updatedItems);
        set({ cart: { ...cart, items: updatedItems, ...totals } });
      },

      clearCart: () => set({ cart: emptyCart() }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      applyCoupon: (code) => {
        const { cart } = get();
        // TODO: validate against server
        const discount = code === "LAKSHYA10" ? Math.round(cart.subtotal * 0.1) : 0;
        set({ cart: { ...cart, couponCode: code, discount, total: cart.subtotal - discount + cart.shippingFee } });
      },
    }),
    {
      name: "lakshya-cart",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? window.localStorage : ({} as Storage))),
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

export { cartItemCount };
