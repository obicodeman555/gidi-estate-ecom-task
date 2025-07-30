import { type IProduct } from "@/types/product";
import products from "@/data/products.json";

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

  let merged: IProduct[];

  if (!existingRaw || existingVersion !== CURRENT_VERSION) {
    const existing = existingRaw ? JSON.parse(existingRaw) : [];

    merged = mergeProducts(existing, products);
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

export const getProductById = (id: string): IProduct => {
  const products = getProducts();
  const product = products.find((product) => product.productId === id);
  if (!product) {
    throw new Error(`Product with ID ${id} not found`);
  }
  return product;
};

export const addProduct = (product: Partial<IProduct>): void => {
  if (typeof window === "undefined") return;
  const products = getProducts();
  const updated = [...products, product];
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
};

export const updateProduct = (
  id: string,
  updatedProduct: Partial<IProduct>
) => {
  const products = getProducts();

  const updated = products.map((item) =>
    item.productId === id ? updatedProduct : item
  );
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
};

export const deleteProduct = (id: string): void => {
  if (typeof window === "undefined") return;

  const raw = localStorage.getItem(PRODUCTS_KEY);
  if (!raw) return;

  const products: IProduct[] = JSON.parse(raw);

  const updated = products.filter((item) => item.productId !== id);

  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
};
