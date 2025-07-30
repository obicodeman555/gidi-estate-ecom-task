import { ProductForm } from "@/app/components";

const AddNewProduct = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col gap-6 py-16">
        <h1 className="text-3xl font-black text-center">Add Product</h1>
        <ProductForm />
      </div>
    </div>
  );
};

export default AddNewProduct;
