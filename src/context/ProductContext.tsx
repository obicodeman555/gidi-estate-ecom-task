"use client";

import {
  addProduct,
  deleteProduct,
  getProducts as getStoredProducts,
} from "@/lib/product";
import type { IProduct, IProductContextType } from "@/types/product";
import { useRouter } from "next/navigation";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const ProductContext = createContext<IProductContextType | null>(null);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const onAddNewProduct = useCallback(
    (product: IProduct) => {
      addProduct(product);
      setProducts((prev) => [...prev, product]);
      router.push("/");
    },
    [router]
  );

  const remove = useCallback((id: string) => {
    setProducts((prev) => {
      const next = prev.filter((item) => item.productId !== id);
      deleteProduct(id);

      return next;
    });
  }, []);

  useEffect(() => {
    const loadedProducts = getStoredProducts();
    setProducts(loadedProducts);
    setLoading(false);
  }, []);
  return (
    <ProductContext.Provider
      value={{ products, onAddNewProduct, remove, loading }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProducts must be used inside ProductProvider");
  return context;
};
