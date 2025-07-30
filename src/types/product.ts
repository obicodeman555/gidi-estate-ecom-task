export interface ProductFilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface ICategory {
  id: string;
  slug: string;
  name: string;
}
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
  longDescription?: string;
  productThumbnails?: string[];
}

export interface IProductContextType {
  products: IProduct[];
  onAddNewProduct?: (product: IProduct) => void;
  update?: (product: IProduct) => void;
  remove?: (id: string) => void;
  loading?: boolean;
  filterProducts: (
    products: IProduct[],
    options: ProductFilterOptions
  ) => IProduct[];
}

export interface PriceOption {
  label: string;
  min: string;
  max: string;
}
