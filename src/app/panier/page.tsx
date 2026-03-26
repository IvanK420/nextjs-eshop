"use client";

import { fetchProductsByIds, mergeCartItems } from "@/lib/products";
import { useCartStore } from "@/stores/useCartStore";
import CartItem from "@/types/cartItem";
import { useEffect, useState } from "react";

function Panier() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const items = useCartStore((state) => state.items);

  async function handleCommand() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }), // On envoie les items du store
      });

      const { url } = await response.json();
      if (url) window.location.href = url; // Redirection vers Stripe
    } catch (error) {
      console.error("Erreur lors de la commande :", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function fetchProduits() {
      if (items.length === 0) {
        setCart([]);
        return;
      }
      const products = await fetchProductsByIds(items.map((item) => item.id));
      const enrichedCart = mergeCartItems(items, products);
      setCart(enrichedCart);
    }
    fetchProduits();
  }, [items]);

  return (
    <div className="flex flex-col justify-center items-center gap-10 p-4">
      <h1 className="text-5xl font-bold">Votre Panier</h1>
      <div className="divider"></div>

      {cart.length > 0 ? (
        <>
          <div className="overflow-x-auto border rounded-lg w-full max-w-4xl">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prix</th>
                  <th>Quantité</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.productId}>
                    <td>{item.name}</td>
                    <td>{item.price.toFixed(2)} €</td>
                    <td>{item.quantity}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => removeItem(item.productId)}
                      >
                        Retirer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            className={`btn btn-wide btn-primary ${isLoading ? "loading" : ""}`}
            onClick={handleCommand}
            disabled={isLoading}
          >
            {isLoading ? "Chargement..." : "Commander"}
          </button>
        </>
      ) : (
        <p className="text-xl">Votre panier est vide.</p>
      )}
    </div>
  );
}

export default Panier;
