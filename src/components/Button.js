import { CartContext } from "@/Contexts/CartContext";
import Image from "next/image";
import { useContext } from "react";

function Button({ id }) {
  const { selectedItems, addItem, increment, decrement } = useContext(CartContext);

  const currentItem = selectedItems.find(item => item.index === id);
  const isAdding = !!currentItem;
  const count = currentItem?.count || 0;

  const handleShowAdding = () => {
    addItem(id);
  };

  return (
    <div className="absolute flex items-center justify-center -top-12 w-full">
      {!isAdding ? (
        <button onClick={handleShowAdding} className='flex items-center justify-center text-[12px] font-bold w-[130px] cursor-pointer bg-white py-2 px-2 ring-1 ring-rose-500 rounded-4xl hover:ring-red-700 hover:text-red-700 transition-all'><Image className='w-4 mr-2' src="icon-add-to-cart.svg" alt="" width={1000} height={1000} /> Add to Cart</button>
      ) : (
        <div className='flex items-center justify-between text-[12px] w-[130px] font-bold cursor-pointer bg-red-700 py-2 px-2 rounded-4xl'>
          <button className="ring-2 ring-rose-200 p-1 rounded-full hover:bg-rose-900 transition-all" onClick={() => decrement(id)}><Image className='size-2' src="icon-decrement-quantity.svg" alt="" width={1000} height={1000} /></button>
          <span className="text-[13px] text-rose-200">{count}</span>
          <button className="ring-2 ring-rose-200 p-1 rounded-full hover:bg-rose-900 transition-all" onClick={() => increment(id)}><Image className='size-2' src="icon-increment-quantity.svg" alt="" width={1000} height={1000} /></button>
        </div>
      )}
    </div>
  );
}


export default Button;