"use client";
import { DeleteIconFill, PenIconFill } from "@/assets/svgs";
import { useProduct } from "@/context/ProductContext";
import { type IProduct } from "@/types/product";
import { calcDiscountedPrice, formatAmount, truncate } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }: { product: IProduct }) => {
  const router = useRouter();
  const { remove } = useProduct();
  return (
    <div className="productCard flex flex-col relative">
      <Link
        href={`/products/${product.productId}`}
        className="flex flex-col h-100 productCard__link bg-white border border-solid rounded-[20px]"
      >
        <div className="productCard__image">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={200}
            height={200}
          />
        </div>
        <div className="productCard__text flex flex-col mt-5 gap-1">
          <span className="text-xl font-black">{product.name}</span>
          <span className="text-sm">{truncate(product.shortDescription)}</span>
        </div>

        <div className="flex flex-col productCard__price mt-auto">
          <span>Price:</span>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-nowrap">
              &#8358;{formatAmount(product.price)}
            </span>
            <span className="text-xs line-through">
              &#8358;{calcDiscountedPrice(product.offPrice, product.price)}
            </span>
          </div>
        </div>
      </Link>
      <div className="flex flex-col gap-2 productCard__ctas absolute top-4 right-3">
        <button type="button" onClick={() => remove?.(product.productId)}>
          <DeleteIconFill />
          <span className="text-xs font-bold flex items-center justify-center">
            Delete to remove
          </span>
        </button>
        <button
          type="button"
          onClick={() => router.push(`/products/edit/${product.productId}`)}
        >
          <PenIconFill />
          <span className="text-xs font-bold flex items-center justify-center">
            Edit
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
