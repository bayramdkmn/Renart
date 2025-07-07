import fs from 'fs';
import path from 'path';
import { Product, ProductWithPrice } from '../types/product';
import { GoldPriceService } from './goldPriceService';

export class ProductService {
  private static instance: ProductService;
  private products: Product[] = [];
  private goldPriceService: GoldPriceService;

  private constructor() {
    this.goldPriceService = GoldPriceService.getInstance();
    this.loadProducts();
  }

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  private loadProducts(): void {
    try {
      const productsPath = path.join(__dirname, '../../products.json');
      const productsData = fs.readFileSync(productsPath, 'utf8');
      this.products = JSON.parse(productsData);
    } catch (error) {
      console.error('Ürün verileri yüklenemedi:', error);
      this.products = [];
    }
  }

  public async getProductsWithPrices(): Promise<ProductWithPrice[]> {
    const goldPricePerOz = await this.goldPriceService.getGoldPrice();
    const goldPricePerGram = this.goldPriceService.convertOzToGram(goldPricePerOz);

    return this.products.map(product => {
      const price = (product.popularityScore + 1) * product.weight * goldPricePerGram;
      const popularityScoreOutOf5 = Math.round(product.popularityScore * 5 * 10) / 10; // 1 ondalık basamak

      return {
        ...product,
        price: Math.round(price * 100) / 100, // 2 ondalık basamak
        popularityScoreOutOf5
      };
    });
  }

  public async getProductsWithFilters(
    minPrice?: number,
    maxPrice?: number,
    minPopularity?: number,
    maxPopularity?: number
  ): Promise<ProductWithPrice[]> {
    let products = await this.getProductsWithPrices();

    if (minPrice !== undefined) {
      products = products.filter(product => product.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      products = products.filter(product => product.price <= maxPrice);
    }

    if (minPopularity !== undefined) {
      products = products.filter(product => product.popularityScoreOutOf5 >= minPopularity);
    }

    if (maxPopularity !== undefined) {
      products = products.filter(product => product.popularityScoreOutOf5 <= maxPopularity);
    }

    return products;
  }
} 