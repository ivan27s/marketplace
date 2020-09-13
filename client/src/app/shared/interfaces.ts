export interface User {
  email: string;
  password: string;
  name: string;
  phone: string;
  imageSrc?: string;
}

export interface Message {
  message: string;
}

export interface ProtectedUser {
  name: string;
  phone: string;
  imageSrc?: string;
}

export interface Product {
  name: string;
  imageSrc?: string;
  price: number;
  category: string;
  description: string;
  views?: number;
  owner?: string;
  _id?: string;
}

export interface PageProducts {
  products: Product[];
  countAll: number;
}

export interface ProductInfo {
   product: Product;
   user: ProtectedUser;
}
