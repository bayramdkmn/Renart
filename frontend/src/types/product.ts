export interface Product {
  name: string;
  popularityScore: number;
  weight: number;
  images: {
    yellow: string;
    rose: string;
    white: string;
  };
  price: number;
  popularityScoreOutOf5: number;
}

export type ColorOption = 'yellow' | 'rose' | 'white'; 