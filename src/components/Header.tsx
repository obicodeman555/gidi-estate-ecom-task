import { AddIcon, SearchOutline, BellIcon } from "@/assets/svgs";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-white py-2">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-black">
            GIDI
          </Link>
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
  );
};
