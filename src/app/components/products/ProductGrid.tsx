"use client";
import ProductCard from "./ProductCard";
import { useProduct } from "@/context/ProductContext";

export const ProductGrid = () => {
  const { products, loading } = useProduct();

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
