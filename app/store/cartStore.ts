import { create } from "zustand";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  fabric: string;
  quantity: number;
}

interface CartState {
  isOpen: boolean;
  items: CartItem[];
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number, size: string) => void;
  updateQuantity: (id: number, size: string, qty: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  isOpen: false,
  items: [],
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  addItem: (newItem) => set((state) => {
    const existingIndex = state.items.findIndex(
      (item) => item.id === newItem.id && item.size === newItem.size
    );

    if (existingIndex > -1) {
      const updatedItems = [...state.items];
      updatedItems[existingIndex].quantity += 1;
      return { items: updatedItems, isOpen: true };
    }

    return { items: [...state.items, { ...newItem, quantity: 1 }], isOpen: true };
  }),
  removeItem: (id, size) => set((state) => ({
    items: state.items.filter((item) => !(item.id === id && item.size === size)),
  })),
  updateQuantity: (id, size, qty) => set((state) => ({
    items: state.items.map((item) =>
      item.id === id && item.size === size ? { ...item, quantity: Math.max(1, qty) } : item
    ),
  })),
}));