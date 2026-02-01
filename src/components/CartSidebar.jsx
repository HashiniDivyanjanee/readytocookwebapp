import React, { useState } from "react";
import { CheckoutModal } from "./CheckoutModel";

export const CartSidebar = ({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeItem,
}) => {
  const total = cart.reduce(
    (sum, item) => sum + (Number(item.priceValue) || 0) * (item.quantity || 0),
    0,
  );
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] transition-transform duration-700 transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-8 border-b flex justify-between items-center bg-gray-50">
            <h2 className="text-3xl font-oswald font-bold uppercase tracking-tight text-gray-900">
              Your Order
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <p className="text-gray-900 font-oswald text-2xl font-bold uppercase">
                  Your Pit is Cold!
                </p>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="flex space-x-6 border-b border-gray-100 pb-8 last:border-0"
                >
                  <div className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-oswald font-bold text-xl text-gray-900 uppercase tracking-tight">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-300 hover:text-red-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Meta info */}
                      {(item.selectedSold || item.selectedSpicy) && (
                        <div className="flex gap-2 mt-1">
                          {item.selectedSold && (
                            <span className="text-[8px] font-black uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded text-gray-500">
                              Sold: {item.selectedSold}
                            </span>
                          )}
                          {item.selectedSpicy && (
                            <span className="text-[8px] font-black uppercase tracking-widest bg-[#FF5C00]/10 px-2 py-0.5 rounded text-[#FF5C00]">
                              Spicy: {item.selectedSpicy}
                            </span>
                          )}
                        </div>
                      )}

                      <p className="font-oswald font-bold text-lg text-gray-900">
                        Rs.{" "}
                        {(
                          (Number(item.priceValue) || 0) * (item.quantity || 0)
                        ).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 font-bold"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold font-oswald text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 font-bold"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-oswald font-bold text-lg text-gray-900">
                        Rs. {(item.priceValue * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <div className="p-8 border-t bg-gray-50 space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-oswald text-2xl font-bold uppercase text-gray-500">
                  Subtotal
                </span>
                <span className="text-3xl font-oswald font-bold text-[#FF5C00]">
                  Rs. {total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-lg uppercase shadow-2xl hover:bg-[#FF5C00] transition-all"
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        total={total}
        clearCart={() => {}}
      />
    </>
  );
};
