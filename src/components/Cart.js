"use client";

import { CartContext } from "@/Contexts/CartContext";
import Image from "next/image";
import React, { useContext } from "react";

function Cart() {
  const { selectedItems, data, removeItem, setIsModalOpen } = useContext(CartContext);

  const totalCount = selectedItems.reduce(
    (sum, item) => sum + item.count,
    0
  );

  const totalPrice = selectedItems.reduce((sum, item) => {
  const product = data[item.index];
  return sum + product.price * item.count;
}, 0);

  return (
    <div className="bg-white h-max p-5 rounded-lg sticky top-[20px]">
      <h1 className="text-[18px] text-red font-bold">
        Your Cart ({totalCount})
      </h1>

      {totalCount === 0 ? (
        <div className="flex items-center justify-center flex-col">
          <Image
            className="size-40 mt-10 mb-3"
            src="illustration-empty-cart.svg"
            alt=""
            width={1000}
            height={1000}
          />
          <p className="text-[14px] text-rose-500 mb-3">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {selectedItems.map((cartItem) => {
            const product = data[cartItem.index];

            return (
              <div
                key={cartItem.index}
                className="flex items-center justify-between border-b border-rose-100 pb-4"
              >
                <div>
                  <p className="text-[14px] font-bold text-rose-900 mb-2">
                    {product.name}
                  </p>

                  <div className="flex items-center">
                    <p className="text-[14px] font-bold text-red mr-5">
                      {cartItem.count}x
                    </p>

                    <p className="text-[14px] text-rose-500 mr-3">
                      <span className="text-[12px]">@</span> $
                      {product.price.toFixed(2)}
                    </p>

                    <p className="text-[14px] font-bold text-rose-500">
                      $
                      {(cartItem.count * product.price).toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(cartItem.index)}
                  className="p-0.5 rounded-full ring-2 ring-rose-500 w-max hover:bg-rose-50 hover:ring-rose-900 transition-all"
                >
                  <Image
                    className="size-3"
                    src="icon-remove-item.svg"
                    alt="Remove item"
                    width={1000}
                    height={1000}
                  />
                </button>
              </div>
            );
          })}
          <div className="flex items-center justify-between">
            <p className="text-[14px] text-rose-500 font-bold">Order Total</p>
            <h4 className="text-[25px] font-bold text-rose-900">${totalPrice.toFixed(2)}</h4>
          </div>
          <div className="flex items-center justify-center text-[14px] text-rose-500 bg-rose-50 p-4 rounded-[10px] mb-5"><Image className="size-5 mr-2" src="icon-carbon-neutral.svg" alt="" width={1000} height={1000} /> <p>This is a <strong className="font-bold mx-1"> carbon-neutral </strong> delivery</p></div>
          <button className="w-full p-4 bg-red rounded-4xl text-[16px] text-rose-50 hover:bg-red-900 transition-all" onClick={() => setIsModalOpen(true)}>Confirm Order</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
