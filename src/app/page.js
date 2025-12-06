"use client"
import Cart from "@/components/Cart";
import Desserts from "@/components/Desserts";
import OrderModal from "@/components/OrderModal";
import { CartContext } from "@/Contexts/CartContext";
import { desertData } from "@/data";
import { useState } from "react";

export default function Home() {
      const [data, setData] = useState(desertData)
      const [selected, setSelected] = useState(false)
      const [count, setCount] = useState(0)
      const [selectedItems, setSelectedItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

  const addItem = (index) => {
    setSelectedItems((prev) => {
      const existing = prev.find((item) => item.index === index);

      if (existing) {
        return prev.map((item) =>
          item.index === index
            ? { ...item, count: item.count + 1 }
            : item
        );
      }

      return [...prev, { index, count: 1 }];
    });
  };

  const removeItem = (index) => {
    setSelectedItems((prev) =>
      prev.filter((item) => item.index !== index)
    );
  };
  const increment = (index) => {
    setSelectedItems(prev =>
      prev.map(item =>
        item.index === index
          ? { ...item, count: item.count + 1 }
          : item
      )
    );
  };
  const decrement = (index) => {
    setSelectedItems(prev =>
      prev.map(item =>
        item.index === index
          ? { ...item, count: Math.max(1, item.count - 1) }
          : item
      )
    );
  };
    const clearCart = () => {
    setSelectedItems([]);
    setIsModalOpen(false);
  };
  
  return (
      <CartContext.Provider value={{data, selected, count, selectedItems,
      addItem,
      increment,
      decrement,
      removeItem,
        clearCart,
        isModalOpen,
        setIsModalOpen}}>
        <main className="max-w-[400px] md:max-w-[1440px] m-auto md:py-25  font-sans">
        <section className="grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr] max-w-[1300px] m-auto">
          <Desserts />
          <Cart />
          <OrderModal />
        </section>
      </main>
      </CartContext.Provider>
  );
}
