
import CartItem from "@/types/cartItem";
import { Product } from "../../generated/prisma/browser";

/**
 * Fetch les produits selon les IDs fournis
 * @param ids - Tableau des IDs des produits à récupérer
 * @returns Tableau des produits trouvés
 */
export async function fetchProductsByIds(ids: number[]): Promise<Product[]> {
  if (ids.length === 0) {
    return [];
  }

  try {
    const idsString = ids.join(",");
    const response = await fetch(`/api/products?ids=${idsString}`);
    
    if (!response.ok) {
      console.error("Erreur lors de la récupération des produits:", response.status);
      return [];
    }
    
    const products: Product[] = await response.json();
    return products;
  } catch (error) {
    console.error("Erreur lors du fetch des produits:", error);
    return [];
  }
}

/**
 * Merge les items du panier avec les détails des produits
 * @param items - Items du store Zustand { id, quantity }
 * @param products - Produits fetched avec détails { id, name, price, ... }
 * @returns Tableau de CartItem enrichis { productId, name, price, quantity }
 */
export function mergeCartItems(
  items: Array<{ id: number; quantity: number }>,
  products: Product[]
): CartItem[] {
  return items
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      
      if (!product) {
        return null;
      }

      return {
        productId: item.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      };
    })
    .filter((item): item is CartItem => item !== null);
}
