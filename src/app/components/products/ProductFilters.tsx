"use client";
import { ArrowRight, FilterIcon } from "@/assets/svgs";
import { useProduct } from "@/context/ProductContext";
import { extractUniqueCategories } from "@/utils/helpers";
import { PriceOption } from "@/types/product";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, type MouseEvent } from "react";

export const priceOptions: PriceOption[] = [
  { label: "Under  ₦2000", min: "0", max: "2000" },
  { label: "₦2000 - ₦5000", min: "2000", max: "5000" },
  { label: "₦5000 - ₦10000", min: "5000", max: "10000" },
  { label: "₦10000 - ₦50000", min: "10000", max: "50000" },
  { label: "₦50000 - ₦100000", min: "50000", max: "100000" },
  { label: "₦100000 and above", min: "100000", max: "" },
];

export const ProductFilters = () => {
  const [openAccordions, setOpenAccordions] = useState<{
    [key: string]: boolean;
  }>({
    categories: false,
    brand: false,
    price: false,
  });

  const searchParams = useSearchParams();

  const router = useRouter();

  const { products } = useProduct();

  const productCategories = extractUniqueCategories(products);

  const selectedCategory = searchParams.get("category") ?? "";
  const price = searchParams.get("price") ?? "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };

  const handleOpenAccordion = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      const buttonName = e.currentTarget.name;

      // Toggle the specific accordion's open/close state
      setOpenAccordions((prevState) => ({
        ...prevState,
        [buttonName]: !prevState[buttonName], // Toggle the selected accordion
      }));
    },
    []
  );

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between  pb-3 border-solid border-b-1 border-b-[#dae1fa78]">
        <span className="font-bold text-xl">Filters</span>
        <FilterIcon />
      </div>
      <div className="accordion flex flex-col overflow-hidden">
        <div className="py-4  border-solid border-b-1 border-b-[#dae1fa78]">
          <button
            type="button"
            className={`accordionButton text-md text-blue-400  w-full flex items-center justify-between ${
              openAccordions.category ? "rotateSvg" : ""
            }`}
            onClick={(e) => handleOpenAccordion(e)}
            name="category"
          >
            <span>Category</span>
            <ArrowRight />
          </button>
          <div
            className={`${
              openAccordions.category
                ? "accordionContent show"
                : "accordionContent hide"
            }`}
          >
            <ul className="mt-2 bg-[#e9e9fb36] flex flex-col gap-4 p-4 border border-solid rounded-[10px] border-[#879ef234]">
              {productCategories?.map((category) => (
                <li key={category.id}>
                  <button
                    type="button"
                    className={`categoryLink font-bold text-sm hover:text-blue-700 ${
                      selectedCategory === category.name.toLowerCase()
                        ? "text-blue-700"
                        : ""
                    }`}
                    onClick={() =>
                      updateFilter("category", category.name.toLowerCase())
                    }
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="accordion flex flex-col overflow-hidden">
        <div className="py-4">
          <button
            className={`accordionButton text-blue-400 w-full flex items-center justify-between ${
              openAccordions.price ? "rotateSvg" : ""
            }`}
            type="button"
            onClick={(e) => handleOpenAccordion(e)}
            name="price"
          >
            <span>Price</span>
            <ArrowRight />
          </button>

          <article
            className={`${
              openAccordions.price
                ? "accordionContent show"
                : "accordionContent hide"
            }`}
          >
            <ul className="mt-4 flex flex-col gap-4 p-4 bg-[#e9e9fb36] border border-solid rounded-[10px] border-[#879ef234]">
              {priceOptions.map((item, i) => {
                const value = item.max
                  ? `${item.min}-${item.max}`
                  : `${item.min}`;
                return (
                  <li key={i} className="flex items-center gap-2">
                    <input
                      type="radio"
                      className="radio-input"
                      name="priceRangeGroup"
                      id={`${i}`}
                      value={value}
                      checked={price === value}
                      onChange={() => updateFilter("price", value)}
                    />

                    <label className="radio-label" htmlFor={`${i}`}>
                      <span className="radio-inner-circle"></span>
                      <span className="font-bold text-sm">{item.label}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
};
