"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../../generated/prisma/client";

function Admin() {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const request = await fetch("/api/products", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: nom,
          description: description,
          price: prix,
          stock: stock,
        }),
      });

      if (request.ok) {
        setMessage("Produit ajouté avec succès!");
        setNom("");
        setDescription("");
        setPrix("");
        setStock("");
        (e.target as HTMLFormElement).reset();
      } else {
        const error = await request.json();
        setMessage(error.error || "Erreur lors de l'ajout du produit");
      }
    } catch (error) {
      setMessage(
        "Erreur: " +
          (error instanceof Error ? error.message : "Erreur inconnue"),
      );
    } finally {
      setLoading(false);
    }
  }
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

  async function deleteMesssage(id : string | undefined) {
    const request = await fetch(`api/products/${id}`,{
        method: "DELETE",
    })
  }
  function handleClick(id:string){
    deleteMesssage(id)
  }
  return (
    <div className="flex min-h-100 flex-col  items-center justify-center gap-10 ">
      <h1 className="text-5xl">Ajouter un produit</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label className="input">
          <span className="label">Nom:</span>
          <input
            type="text"
            placeholder="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </label>
        <label className="input">
          <span className="label">Description:</span>
          <input
            type="text"
            placeholder="Courte description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label className="input">
          <span className="label">Prix:</span>
          <input
            type="number"
            placeholder="0.00€"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            step="0.01"
            required
          />
        </label>
        <label className="input">
          <span className="label">stock:</span>
          <input
            type="number"
            placeholder="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          {loading ? "Ajout en cours..." : "Ajouter"}
        </button>
        {message && (
          <div
            className={`alert ${message.includes("succès") ? "alert-success" : "alert-error"}`}
          >
            {message}
          </div>
        )}
      </form>
      <div>
        <div className="overflow-x-auto w-dvw px-2 ">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Nom</th>
                <th>Description</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                return (
                  <tr key={p.id}>
                    <th>1</th>
                    <td>{p.name}</td>
                    <td>{p.description}</td>
                    <td>{p.price}</td>
                    <td>{p.stock}</td>
                    <td><button className="btn btn-error btn-sm" onClick={()=>handleClick(p.id.toString())}>X</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
