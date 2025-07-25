"use client";

import { getProducts } from "@/lib/product";
import { IProduct } from "@/types/product";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export const ProductGrid = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadedProducts = getProducts();
    setProducts(loadedProducts);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading products</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex">
        <h1 className="text-4xl font-black">All Products</h1>
      </div>
      <div className="productGrid__items grid grid-cols-3 gap-2">
        {products.map((item) => (
          <ProductCard key={item.productId} product={item} />
        ))}
      </div>
    </div>
  );
};
