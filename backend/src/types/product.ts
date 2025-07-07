export interface Product {
  name: string;
  popularityScore: number;
  weight: number;
  images: {
    yellow: string;
    rose: string;
    white: string;
  };
}

export interface ProductWithPrice extends Product {
  price: number;
  popularityScoreOutOf5: number;
}

export interface GoldPriceResponse {
  price: number;
  currency: string;
  timestamp: number;
} 