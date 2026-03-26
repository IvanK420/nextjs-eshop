"use client";
import { useCartStore } from "@/stores/useCartStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BasketHeader() {
  const [isMounted, setIsMounted] = useState(false);
  const total = useCartStore((state) => state.getTotalItems());
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, [])
  return (
    <div>
      <button onClick={() => router.push("/panier")}>
        Panier
        {isMounted && total != 0 &&(
          <div className="badge badge-xs badge-secondary ms-1">{total}</div>
        )}
      </button>
    </div>
  );
}
