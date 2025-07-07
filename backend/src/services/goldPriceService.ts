import axios from 'axios';
export class GoldPriceService {
  private static instance: GoldPriceService;
  private cachedPrice: number | null = null;
  private lastFetchTime: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; 

  private constructor() {}

  public static getInstance(): GoldPriceService {
    if (!GoldPriceService.instance) {
      GoldPriceService.instance = new GoldPriceService();
    }
    return GoldPriceService.instance;
  }

  public async getGoldPrice(): Promise<number> {
    const now = Date.now();
    
    if (this.cachedPrice !== null && (now - this.lastFetchTime) < this.CACHE_DURATION) {
      return this.cachedPrice;
    }

    try {
      const response = await axios.get('https://api.metals.live/v1/spot/gold');
      
      if (response.data && response.data.length > 0) {
        const goldData = response.data[0];
        const price = goldData.price;
        this.cachedPrice = price;
        this.lastFetchTime = now;
        return price;
      } else {
        const defaultPrice = 2000; 
        this.cachedPrice = defaultPrice;
        this.lastFetchTime = now;
        return defaultPrice;
      }
    } catch (error) {
      console.error('Altın fiyatı çekilemedi:', error);
      const defaultPrice = 2000; 
      this.cachedPrice = defaultPrice;
      this.lastFetchTime = now;
      return defaultPrice;
    }
  }

  public convertOzToGram(pricePerOz: number): number {
    return pricePerOz / 31.1035; 
  }
} 