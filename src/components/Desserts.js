"use client";
import Image from "next/image";
import React, { useContext } from "react";
import Button from "./Button";
import { CartContext } from "@/Contexts/CartContext";

function Desserts() {
  const { data, selectedItems } = useContext(CartContext);

  return (
    <div>
      <h1 className="text-[35px] font-extrabold text-rose-900">
        Desserts
      </h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-7">
        {data.map((item, i) => {
          const isSelected = selectedItems.some(
            (cartItem) => cartItem.index === i
          );

          return (
            <div className="group" key={i}>
              <Image
                className={`w-full rounded-lg h-[260px] object-cover transition-all
                ${isSelected ? "ring-3 ring-red-700" : ""}`}
                src={item.image.mobile}
                alt={item.name}
                width={1000}
                height={1000}
              />

              <div className="relative mt-8">
                <Button id={i} />

                <p className="text-[12px] text-rose-500">
                  {item.category}
                </p>

                <h2 className="text-[13px] text-rose-900 font-bold">
                  {item.name}
                </h2>

                <span className="text-[13px] text-red-700 font-bold">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Desserts;
