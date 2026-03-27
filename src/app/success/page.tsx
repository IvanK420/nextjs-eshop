"use client";
import { useCartStore } from "@/stores/useCartStore";
import { useEffect } from "react";

function sucess() {
  const clearCart = useCartStore((state) => state.clearCart);
  useEffect(() => {
    clearCart();
  });
  return (
    <div className="flex flex-col min-h-100 justify-center items-center ">
      <span className="text-rotate text-8xl ">
        <span className="justify-items-center bg-primary text-accent-content ">
          <span className=" ">Mersi pou out z'achat</span>
          <span className=" ">Thank-you for your purchase</span>
          <span className=" ">Merci pour vos achats</span>
        </span>
      </span>
    </div>
  );
}

export default sucess;
