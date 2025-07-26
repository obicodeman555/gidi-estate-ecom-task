"use client";

import { ProductImageGallery } from "@/app/components";
import { ArrowRight, CalendarBold, LorryFast, StoreIcon } from "@/assets/svgs";
import { getProductById } from "@/lib/product";
import { IProduct } from "@/types/product";
import { calcDiscountedPrice, formatAmount } from "@/utils/helpers";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const result = getProductById(params.id as string);
      setProduct(result);
    } catch (err) {
      setError((err as Error).message);
    }
  }, [params.id]);

  if (error)
    return (
      <div className="flex justify-center items-center text-xl text-red-500">
        {error}
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center text-xl">Loading...</div>
    );

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center font-bold gap-2 productDetails__siteMap text-sm py-8">
        <Link href="/">Home</Link>
        <ArrowRight />
        <span className="text-neutral-500">{product.name}</span>
      </div>
      <article className="grid grid-cols-4 gap-8 pb-6">
        <section className="flex gap-4 bg-white border border-solid rounded-[20px] border-[#dbdbdb] col-span-3 p-8">
          <ProductImageGallery images={product.productThumbnails ?? []} />
          <div>
            <div className="productDetails__intro">
              <div>
                <span>{product?.category}</span>
                <span className="text-2xl font-black">{product?.name}</span>
                <div>
                  <span>{product?.shortDescription}</span>
                </div>
              </div>
            </div>
            <div className="productDetails__price">
              <span className="font-black">
                &#8358; {formatAmount(product?.price)}
              </span>
              <span>
                &#8358;{" "}
                {calcDiscountedPrice(
                  product?.offPrice ?? 0,
                  product?.price ?? 0
                )}
              </span>
            </div>
            <div className="productDetails__description">
              <h4 className="text-lg font-bold">About product</h4>
              <p>{product?.longDescription}</p>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-8">
          <div className="uppercase font-bold flex items-center justify-end">
            <span
              className={product?.inStock ? "text-emerald-500" : "text-red-500"}
            >
              {product?.inStock ? "in stock" : "out of stock"}
            </span>
          </div>
          <div className="bg-gray-200 border border-solid rounded-[20px] border-[#dbdbdb]">
            <div className="text-xl flex items-center gap-2 py-3 px-6 border-solid border-b-1 border-b-[#dbdbdb]">
              <LorryFast width={28} height={28} />
              <span>Delivery</span>
            </div>
            <div className="flex flex-col px-4">
              <div className="flex flex-col gap-2 py-6 border-b-1 border-b-[#dbdbdb] border-solid">
                <div className="flex items-center gap-2  text-blue-600">
                  <CalendarBold width={18} height={18} />
                  <span>Shipping</span>
                </div>
                <p className="w-[200px] text-sm font-bold text-neutral-700">
                  Estimated delivery: 2 to 3 days depending on your location.
                </p>
              </div>
              <div className="flex flex-col gap-2 py-6">
                <div className="flex items-center gap-2 text-blue-600">
                  <StoreIcon />
                  <span>Pickup store</span>
                </div>
                <p className="w-[200px] text-sm font-bold text-neutral-700">
                  Available for pick up after 48 hours.
                </p>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
};

export default ProductDetails;
