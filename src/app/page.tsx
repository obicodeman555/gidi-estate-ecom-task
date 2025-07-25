import { type Metadata } from "next";
import { ProductFilters, ProductGrid } from "./components";

export const metadata: Metadata = {
  title: "Home - E-Commerce Platform",
  description: "Browse our amazing products",
};

export default function Home() {
  return (
    <article>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-4 py-10">
          <section className="productFilter__section col-span-1">
            <ProductFilters />
          </section>
          <section className="productListing__section col-span-2">
            <ProductGrid />
          </section>
        </div>
      </div>
    </article>
  );
}
