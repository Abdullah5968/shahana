"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/cartStore";

export default function CartDrawer() {
  const { isOpen, items, closeCart, updateQuantity, removeItem } = useCartStore();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Mask */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black z-50 pointer-events-auto"
          />

          {/* Gliding Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#FAF7F3] text-[#1b1815] z-50 p-6 md:p-8 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#1b1815]/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={16} />
                  <h2 className="text-lg uppercase tracking-widest font-normal" style={{ fontFamily: "var(--font-marcellus)" }}>
                    Shopping Bag ({items.length})
                  </h2>
                </div>
                <button onClick={closeCart} className="p-1 hover:opacity-50 transition-opacity">
                  <X size={18} />
                </button>
              </div>

              {/* Items Display Stack */}
              {items.length === 0 ? (
                <div className="text-center py-20 opacity-40">
                  <p className="text-sm font-light italic mb-4">Your shopping bag is currently empty.</p>
                </div>
              ) : (
                <div className="space-y-6 overflow-y-auto max-h-[60vh] pr-2 no-scrollbar">
                  {items.map((item, index) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 pb-6 border-b border-[#1b1815]/5 items-center">
                      <div className="w-20 aspect-[3/4] bg-[#EDE8E0] flex-shrink-0 relative flex items-center justify-center opacity-40 text-xs font-serif">
                        S
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start gap-2 mb-0.5">
                          <h4 className="text-sm tracking-wide font-normal">{item.name}</h4>
                          <button onClick={() => removeItem(item.id, item.size)} className="opacity-30 hover:opacity-100 text-[#6b1f2a] transition-opacity">
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <p className="text-[11px] text-[#1b1815]/50 tracking-wider mb-3">Fit: {item.size} · {item.fabric}</p>
                        
                        {/* Quantity Counter Manipulator */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-[#1b1815]/15">
                            <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="px-2 py-1 hover:bg-black/5 text-xs">
                              <Minus size={10} />
                            </button>
                            <span className="px-3 text-xs font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="px-2 py-1 hover:bg-black/5 text-xs">
                              <Plus size={10} />
                            </button>
                          </div>
                          <span className="text-sm font-medium">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sticky Order Pricing Summary Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#1b1815]/10 pt-6 mt-4">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs uppercase tracking-widest text-[#1b1815]/50 font-medium">Estimated Subtotal</span>
                  <span className="text-xl font-light">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-[#1b1815]/40 tracking-wide mb-6 italic">Taxes and worldwide luxury shipping calculated at processing.</p>
                
                <button className="w-full bg-[#1b1815] text-white text-center py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#0e4d3b] transition-colors shadow-sm">
                  Proceed to Secure Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}