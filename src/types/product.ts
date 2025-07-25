export interface IProduct {
  productId: string;
  inStock: boolean;
  name: string;
  offPrice: number;
  price: number;
  shortDescription: string;
  slug: string;
  id: string;
  imageUrl: string;
  category: string;
  brand: string;
  longDescription?: string;
  productThumbnails?: string[];
}

export interface IProductContextType {
  products: IProduct[];
  add?: (product: IProduct) => void;
  update?: (product: IProduct) => void;
  remove?: (id: string) => void;
  loading?: boolean;
}
