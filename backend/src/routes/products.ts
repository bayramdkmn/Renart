import { Router, Request, Response } from 'express';
import { ProductService } from '../services/productService';

const router = Router();
const productService = ProductService.getInstance();

// Tüm ürünleri getir
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await productService.getProductsWithPrices();
    res.json(products);
  } catch (error) {
    console.error('Ürünler getirilirken hata:', error);
    res.status(500).json({ error: 'Ürünler getirilemedi' });
  }
});

// Filtreleme ile ürünleri getir
router.get('/filter', async (req: Request, res: Response) => {
  try {
    const { minPrice, maxPrice, minPopularity, maxPopularity } = req.query;
    
    const products = await productService.getProductsWithFilters(
      minPrice ? Number(minPrice) : undefined,
      maxPrice ? Number(maxPrice) : undefined,
      minPopularity ? Number(minPopularity) : undefined,
      maxPopularity ? Number(maxPopularity) : undefined
    );
    
    res.json(products);
  } catch (error) {
    console.error('Filtrelenmiş ürünler getirilirken hata:', error);
    res.status(500).json({ error: 'Ürünler filtrelenemedi' });
  }
});

export default router; 