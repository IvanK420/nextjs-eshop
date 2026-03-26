"use client";
import { useEffect, useState } from "react";
import { Product } from "../../generated/prisma/client";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProduits() {
      const request = await fetch("/api/products");
      if (!request.ok) {
        console.log(request.status);
        return;
      }
      const data = await request.json();
      // console.log("coucou")
      setProducts(data);
    }
    fetchProduits();
  }, []);

  if (products.length === 0) {
    return( <div>
      <header className="flex flex-row justify-center mb-6">
        <h1 className="text-7xl">Nout catalogue</h1>
      </header>
      <div className="divider"></div>
      <main className="flex flex-col items-center justify-center mx-50">
        <div className="text-6xl">Aucun Produit</div>
      </main>
    </div>)
  }
  return (
    <div>
      <header className="flex flex-row justify-center mb-6">
        <h1 className="text-7xl">Nout catalogue</h1>
      </header>
      <div className="divider"></div>
      <main className="flex flex-col items-center justify-center mx-50">
        <div className="flex flex-row flex-wrap content-around justify-around gap-2">
          {products.map((p) => {
            return <ProductCard product={p} key={p.id}></ProductCard>;
          })}
        </div>
      </main>
    </div>
  );
}
