import { type Metadata } from "next";
import { ProductFilters, ProductGrid } from "./components";
import { Suspense } from "react";
import { Loader } from "@/components";

export const metadata: Metadata = {
  title: "Home - E-Commerce Platform",
  description: "Browse our amazing products",
};

export default function Home() {
  return (
    <article>
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center h-100 bg-white rounded-[10px]">
            <Loader />
          </div>
        }
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-8 py-10 items-start">
            <section className="productFilter__section col-span-1">
              <ProductFilters />
            </section>
            <section className="productListing__section col-span-3">
              <ProductGrid />
            </section>
          </div>
        </div>
      </Suspense>
    </article>
  );
}
