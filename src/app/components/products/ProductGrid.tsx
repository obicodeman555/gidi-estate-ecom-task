"use client";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { useProduct } from "@/context/ProductContext";
import { useMemo } from "react";

export const ProductGrid = () => {
  const { products, loading } = useProduct();

  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? undefined;
  const price = searchParams.get("price") ?? undefined;

  const [minPrice, maxPrice] = useMemo(() => {
    if (!price) return [undefined, undefined];
    const [min, max] = price.split("-");
    return [Number(min), max ? Number(max) : undefined];
  }, [price]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category
        ? product.category.toLowerCase() === category
        : true;

      const matchesPrice =
        product.price >= (minPrice ?? 0) &&
        (maxPrice === undefined || product.price <= maxPrice);

      return matchesCategory && matchesPrice;
    });
  }, [products, category, minPrice, maxPrice]);

  if (loading) {
    return <div>Loading products</div>;
  }

  if (filteredProducts.length === 0 || products.length === 0) {
    return (
      <div className="border border-solid h-full">
        <h1>We couldn&apos;t find what you&apos;re looking for.</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex">
        <h1 className="text-4xl font-black">All Products</h1>
      </div>
      <div className="productGrid__items grid grid-cols-3 gap-4">
        {filteredProducts.map((item) => (
          <ProductCard key={item.productId} product={item} />
        ))}
      </div>
    </div>
  );
};
