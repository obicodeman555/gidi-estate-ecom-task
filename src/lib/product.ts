import { type IProduct } from "@/types/product";
import sampleProducts from "@/data/sample-products.json";

const PRODUCTS_KEY = "products";
const PRODUCTS_VERSION_KEY = "0bic0deM@n";
const CURRENT_VERSION = "v1.3";

const mergeProducts = (
  existing: IProduct[],
  incoming: IProduct[]
): IProduct[] => {
  const exisitingProductIds = new Set(existing.map((item) => item.productId));
  const newProduct = incoming.filter(
    (item) => !exisitingProductIds.has(item.productId)
  );

  return [...existing, ...newProduct];
};

const initializeOrUpdateProducts = (): IProduct[] => {
  const existingRaw = localStorage.getItem(PRODUCTS_KEY);
  const existingVersion = localStorage.getItem(PRODUCTS_VERSION_KEY);
  const sample = sampleProducts as IProduct[];

  let merged: IProduct[];

  if (!existingRaw || existingVersion !== CURRENT_VERSION) {
    const existing = existingRaw ? JSON.parse(existingRaw) : [];

    merged = mergeProducts(existing, sample);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(merged));
    localStorage.setItem(PRODUCTS_VERSION_KEY, CURRENT_VERSION);
  } else {
    merged = JSON.parse(existingRaw);
  }

  return merged;
};

export const getProducts = (): IProduct[] => {
  if (typeof window === "undefined") return [];

  return initializeOrUpdateProducts();
};
