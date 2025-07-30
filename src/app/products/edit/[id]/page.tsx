"use client";
import { ProductForm } from "@/app/components";
import { getProductById } from "@/lib/product";
import { useParams } from "next/navigation";

const EditForm = () => {
  const params = useParams();
  const currentProduct = getProductById(params?.id as string);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col gap-2 py-16">
        <h1 className="text-3xl font-black text-center">Edit Product</h1>
        <ProductForm initialProduct={currentProduct} isEdit={true} />
      </div>
    </div>
  );
};

export default EditForm;
