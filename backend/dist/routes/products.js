"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productService_1 = require("../services/productService");
const router = (0, express_1.Router)();
const productService = productService_1.ProductService.getInstance();
// Tüm ürünleri getir
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productService.getProductsWithPrices();
        res.json(products);
    }
    catch (error) {
        console.error('Ürünler getirilirken hata:', error);
        res.status(500).json({ error: 'Ürünler getirilemedi' });
    }
}));
// Filtreleme ile ürünleri getir
router.get('/filter', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { minPrice, maxPrice, minPopularity, maxPopularity } = req.query;
        const products = yield productService.getProductsWithFilters(minPrice ? Number(minPrice) : undefined, maxPrice ? Number(maxPrice) : undefined, minPopularity ? Number(minPopularity) : undefined, maxPopularity ? Number(maxPopularity) : undefined);
        res.json(products);
    }
    catch (error) {
        console.error('Filtrelenmiş ürünler getirilirken hata:', error);
        res.status(500).json({ error: 'Ürünler filtrelenemedi' });
    }
}));
exports.default = router;
