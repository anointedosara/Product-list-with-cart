"use client";
import { CartContext } from "@/Contexts/CartContext";
import Image from "next/image";
import React, { useContext, useEffect } from "react";

function OrderModal() {
  const {
    selectedItems,
    data,
    clearCart,
    isModalOpen,
    setIsModalOpen,
  } = useContext(CartContext);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const totalPrice = selectedItems.reduce((sum, item) => {
    const product = data[item.index];
    return sum + product.price * item.count;
  }, 0);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-0 md:p-5">
      <div className="absolute md:static rounded-b-none bg-white bottom-0 w-full max-w-full md:max-w-[600px] max-h-[90vh] md:max-h-full overflow-auto md:rounded-2xl p-5 md:p-10 animate-scaleUp">

        <div className="mb-4">
          <Image
            className="rounded-full size-13"
            src="icon-order-confirmed.svg"
            alt=""
            width={1000}
            height={1000}
          />
        </div>

        <h2 className="text-[30px] md:text-[40px] font-extrabold text-rose-900">
          Order Confirmed
        </h2>
        <p className="text-[16px] text-rose-400 mb-8">
          We hope you enjoy your food!
        </p>

        <div className="bg-rose-50 p-5 rounded-xl space-y-4 mb-8">
          {selectedItems.map((item) => {
            const product = data[item.index];

            return (
              <div
                key={item.index}
                className="flex items-center justify-between py-3 border-b border-rose-100"
              >
                <div className="flex items-center">
                  <Image
                    className="size-13 rounded-md object-cover mr-4"
                    src={product.image.thumbnail}
                    alt={product.name}
                    width={1000}
                    height={1000}
                  />

                  <div>
                    <p className="text-[14px] mb-2 font-bold text-rose-900">
                      {product.name}
                    </p>
                    <p className="text-[14px] text-rose-400">
                      <strong className="font-bold mr-3 text-red">
                        {item.count}x
                      </strong>
                      <span className="text-[10px] mr-1">@ </span>$
                      {product.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <p className="text-[18px] font-bold text-rose-900">
                  ${(item.count * product.price).toFixed(2)}
                </p>
              </div>
            );
          })}

          <div className="flex items-center justify-between pt-2">
            <p className="text-[14px] font-bold text-rose-500">
              Order Total
            </p>
            <p className="text-[25px] font-extrabold text-rose-900">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>

        <button
          onClick={clearCart}
          className="w-full p-4 bg-red-700 rounded-4xl text-[16px] text-white hover:bg-red-900 transition-all"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}

export default OrderModal;
