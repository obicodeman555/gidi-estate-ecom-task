"use client";
import { type IProduct } from "@/types/product";
import { generateId } from "@/utils/helpers";
import { useState } from "react";

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
      price: 0,
      longDescription: "",
      shortDescription: "",
      imageUrl: "",
      offPrice: 0,
      inStock: false,
    }
  );
  return (
    <div className="bg-white border border-solid rounded-[20px] border-[#dbdbdb]">
      <form className="flex flex-col gap-4 p-16">
        <div>
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border p-2 w-full"
            placeholder="Product Name"
          />
        </div>
        <div>
          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: parseFloat(e.target.value) })
            }
            className="border p-2 w-full"
            placeholder="Enter Price"
          />
        </div>
        <div>
          <label
            htmlFor="offPrice"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Off Price
          </label>
          <input
            type="number"
            name="offPrice"
            id="offPrice"
            value={formData.offPrice}
            onChange={(e) =>
              setFormData({ ...formData, offPrice: parseFloat(e.target.value) })
            }
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Optional discounted price"
          />
        </div>
        <div>
          <input
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            className="border p-2 w-full"
            placeholder="Image URL"
          />
        </div>
        <div>
          <textarea
            value={formData.longDescription}
            onChange={(e) =>
              setFormData({ ...formData, longDescription: e.target.value })
            }
            className="border p-2 w-full"
            placeholder="Long Description"
          />
        </div>
        <div>
          <textarea
            value={formData.shortDescription}
            onChange={(e) =>
              setFormData({ ...formData, shortDescription: e.target.value })
            }
            className="border p-2 w-full"
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
            <span className="text-sm text-gray-700">In Stock</span>
          </label>
        </div>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            {isEdit ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};
