"use client";
import { type IProduct } from "@/types/product";
import { generateId } from "@/utils/helpers";
import { type FormEvent, useState } from "react";

interface ProductFormProps {
  initialProduct?: IProduct;
  isEdit?: boolean;
}

export const ProductForm = ({
  initialProduct,
  isEdit = false,
}: ProductFormProps) => {
  const [formData, setFormData] = useState<Partial<IProduct>>(
    initialProduct || {
      id: generateId(),
      name: "",
      price: "",
      longDescription: "",
      shortDescription: "",
      imageUrl: "",
      offPrice: "",
      inStock: false,
    }
  );

  const handleNumericInput = (e: FormEvent<HTMLInputElement>) => {
    const numericValue = e.currentTarget.value.replace(/\D/g, ""); // Allow only numbers;
    setFormData({
      ...formData,
      [e.currentTarget.name]:
        numericValue === "" ? "" : parseFloat(numericValue),
    });
  };

  return (
    <div className="bg-white border border-solid rounded-[20px] border-[#dbdbdb]">
      <form className="flex flex-col gap-4 pt-14 pb-8 px-14">
        <div className="flex flex-col">
          <input
            name="productName"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border  p-3 border-solid rounded-[8px] bg-[#F4F2FF] border-transparent sm:text-sm"
            placeholder="Product Name"
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
        <div className="flex flex-col">
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            className="border p-3 border-solid rounded-[8px] bg-[#F4F2FF] border-transparent sm:text-sm"
            placeholder="Image URL"
          />
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
          <button className="bg-neutral-700 text-white px-4 py-4 rounded">
            {isEdit ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};
