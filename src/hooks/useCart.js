import { create } from 'zustand';

const useCart = create((set, get) => ({
  // state
  items: {},              // { [id]: { product, qty } }
  totalQty: 0,
  totalPrice: 0,

  // actions

  /** add one more of `product` */
  add(product) {
    set((state) => {
      const current = state.items[product.id]?.qty || 0;
      const qty = current + 1;
      return {
        items: {
          ...state.items,
          [product.id]: { product, qty },
        },
      };
    });
    get().recalc();
  },

  /** set exact quantity for `id` (remove if 0) */
  setQty(id, qty) {
    set((state) => {
      const newItems = { ...state.items };
      if (qty <= 0) {
        delete newItems[id];
      } else {
        newItems[id].qty = qty;
      }
      return { items: newItems };
    });
    get().recalc();
  },

  /** remove the item entirely */
  remove(id) {
    set((state) => {
      const newItems = { ...state.items };
      delete newItems[id];
      return { items: newItems };
    });
    get().recalc();
  },

  /** clear the whole cart */
  clear() {
    set({ items: {}, totalQty: 0, totalPrice: 0 });
  },

  /** helper: get current qty of one item */
  getQty(id) {
    return get().items[id]?.qty || 0;
  },

  /** recompute both totalQty and totalPrice */
  recalc() {
    const all = Object.values(get().items);
    const totalQty   = all.reduce((sum, { qty }) => sum + qty, 0);
    const totalPrice = all.reduce(
        (sum, { qty, product }) => sum + qty * (product.price || 0),
        0
    );
    set({ totalQty, totalPrice });
  },
}));

export default useCart;
