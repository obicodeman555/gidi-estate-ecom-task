import { AddIcon, SearchOutline, BellIcon } from "@/assets/svgs";
import { type Metadata } from "next";
import { ProductFilters, ProductGrid } from "./components";

export const metadata: Metadata = {
  title: "Home - E-Commerce Platform",
  description: "Browse our amazing products",
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <header className="bg-white py-2">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black">GIDI</h1>
            <div className="flex flex-col relative searchInput__block">
              <input
                type="text"
                placeholder="Search by products, brands & categories"
                className="bg-transparent"
                name="productSearch"
                id="searchInput"
              />
              <span className="absolute flex items-center justify-center searchInput__icon">
                <SearchOutline />
              </span>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 userAccount">
                <span className="size-9 rounded-full flex items-center justify-center">
                  <AddIcon />
                </span>
                <span className="text-xs font-semibold">Add Product</span>
              </div>
              <BellIcon />
            </div>
          </div>
        </div>
      </header>
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
    </div>
  );
}
