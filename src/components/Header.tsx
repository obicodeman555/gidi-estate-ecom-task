import { AddIcon, BellIcon } from "@/assets/svgs";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-white py-2">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-black">
            GIDI
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href={"/products/add"}
              className="flex items-center gap-2 userAccount"
            >
              <span className="size-9 rounded-full flex items-center justify-center">
                <AddIcon />
              </span>
              <span className="text-xs font-semibold">Add Product</span>
            </Link>
            <BellIcon />
          </div>
        </div>
      </div>
    </header>
  );
};
