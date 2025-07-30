"use client";

import { CustomDropdown } from "@/components";
import { useProduct } from "@/context/ProductContext";
import { extractUniqueCategories } from "@/utils/helpers";
import { type IProduct } from "@/types/product";
import { generateId } from "@/utils/helpers";
import {
  type ChangeEvent,
  type FormEvent,
  useCallback,
  useMemo,
  useState,
} from "react";

interface ProductFormProps {
  initialProduct?: IProduct;
  isEdit?: boolean;
}

export type ProductFormValues = Pick<
  IProduct,
  | "name"
  | "price"
  | "offPrice"
  | "productId"
  | "shortDescription"
  | "longDescription"
  | "imageUrl"
  | "inStock"
>;

export const ProductForm = ({
  initialProduct,
  isEdit = false,
}: ProductFormProps) => {
  const [formData, setFormData] = useState<ProductFormValues>(
    initialProduct || {
      productId: generateId(),
      name: "",
      price: 0,
      longDescription: "",
      shortDescription: "",
      imageUrl: "",
      offPrice: 0,
      inStock: false,
    }
  );

  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { onAddNewProduct, products } = useProduct();

  const customDropdownCatlist = extractUniqueCategories(products);

  const isFormValid = (form: Partial<IProduct>): boolean => {
    return (
      !!form.name?.trim() &&
      !!form.price &&
      !!form.imageUrl?.trim() &&
      !!form.shortDescription?.trim() &&
      !!form.longDescription?.trim()
    );
  };

  const formIsValid = useMemo(() => isFormValid(formData), [formData]);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setSelectedFileName(file.name);
      setFormData((prev) => ({ ...prev, imageUrl: objectUrl }));
    }
  }, []);

  const handleCategorySelect = useCallback(
    (category: { id: string; name: string }) => {
      setSelectedCategory((prev) => ({
        ...prev,
        id: category.id,
        name: category.name,
      }));
    },
    []
  );

  const handleNumericInput = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;

      // 1. Remove all characters except digits and first decimal point
      let numericString = value
        .replace(/[^\d.]/g, "") // Remove all non-digit/non-dot characters
        .replace(/(\..*)\./g, "$1"); // Allow only first decimal point

      // 2. Split into whole and decimal parts
      const parts = numericString.split(".");

      // 3. Format the whole number part (remove leading zeros)
      if (parts[0].length > 1) {
        parts[0] = parts[0].replace(/^0+/, "");
        if (parts[0] === "") parts[0] = "0";
      }

      // 4. Limit decimal places to 2 if needed
      if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 2); // Limit to 2 decimal places
      }

      // 5. Rejoin the parts
      numericString = parts.join(".");

      setFormData({
        ...formData,
        [name]: numericString,
      });
    },
    [formData]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      productId: initialProduct?.productId || generateId(),
      id: initialProduct?.id || generateId(),
      name: formData?.name,
      price: formData?.price,
      offPrice: formData?.offPrice,
      longDescription: formData?.longDescription,
      shortDescription: formData?.shortDescription,
      imageUrl: formData?.imageUrl,
      inStock: formData?.inStock,
      category: selectedCategory?.name ?? "",
      slug: (initialProduct?.name ?? formData?.name)
        .toLowerCase()
        .replace(/\s+/g, "-"),
    };

    if (initialProduct) return;
    else onAddNewProduct?.(payload);
  };

  return (
    <div className="bg-white border border-solid rounded-[20px] border-[#dbdbdb]">
      <form
        className="flex flex-col gap-4 pt-14 pb-8 px-14"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <input
            name="productName"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border  p-3 border-solid rounded-[8px] bg-[#F4F2FF] border-transparent sm:text-sm"
            placeholder="Product Name"
          />
        </div>
        <div>
          <CustomDropdown
            options={customDropdownCatlist}
            selected={selectedCategory}
            onSelect={handleCategorySelect}
            placeholder="Select a category"
          />
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            name="price"
            value={
              isNaN(Number(formData.price)) ? "" : formData.price?.toString()
            }
            onChange={handleNumericInput}
            className="border p-3 border-solid rounded-[8px] bg-[#F4F2FF] border-transparent sm:text-sm"
            placeholder="Enter Price"
          />
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            name="offPrice"
            id="offPrice"
            value={
              isNaN(Number(formData.offPrice))
                ? ""
                : formData.offPrice?.toString()
            }
            onChange={handleNumericInput}
            className="w-full   border  p-3 border-solid rounded-[8px] bg-[#F4F2FF] border-transparent sm:text-sm"
            placeholder="Optional discounted price"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            className="hidden"
            onChange={handleFileChange}
          />
          <p className="flex-1 border p-3 border-solid rounded-[8px] bg-[#F4F2FF] border-transparent sm:text-sm text-[#86858c]">
            {selectedFileName || "No selected image"}
          </p>
          <label
            htmlFor="imageUpload"
            className="cursor-pointer bg-blue-500 text-white font-bold rounded-sm py-1 px-4"
          >
            {selectedFileName ? "Change image" : "Select an image"}
          </label>
        </div>
        <div className="flex flex-col">
          <textarea
            name="shortDescription"
            value={formData.longDescription}
            onChange={(e) =>
              setFormData({ ...formData, longDescription: e.target.value })
            }
            className="border p-3 border-solid rounded-[8px] bg-[#F4F2FF] border-transparent sm:text-sm"
            placeholder="Long Description"
          />
        </div>
        <div className="flex flex-col">
          <textarea
            name="longDescription"
            value={formData.shortDescription}
            onChange={(e) =>
              setFormData({ ...formData, shortDescription: e.target.value })
            }
            className="border p-3 border-solid rounded-[8px] bg-[#F4F2FF] border-transparent sm:text-sm"
            placeholder="Short Description"
          />
        </div>
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={(e) =>
                setFormData({ ...formData, inStock: e.target.checked })
              }
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-blue-600">In Stock</span>
          </label>
        </div>
        <div className="flex flex-col mt-6">
          <button
            type="submit"
            className={`text-lg font-bold productForm__ctaButton  px-4 py-4 rounded ${
              formIsValid
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-neutral-400 text-white"
            }`}
            disabled={!formIsValid}
          >
            {isEdit ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};
