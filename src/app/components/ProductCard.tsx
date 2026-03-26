"use client";
import { useCartStore } from "@/stores/useCartStore";
import { Product } from "../../../generated/prisma/client";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  return (
    <div className="w-fit">
      <div className="card bg-neutral/30 w-96 shadow-sm">
        <div className="card-body ">
          <h2 className="card-title">{product.name}</h2>
          <p>{product.description}</p>
          <p>Prix :{product.price}€</p>
          <p>Quantité :{product.stock}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => addItem(product.id)}
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
