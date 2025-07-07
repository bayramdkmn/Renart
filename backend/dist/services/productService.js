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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const goldPriceService_1 = require("./goldPriceService");
class ProductService {
    constructor() {
        this.products = [];
        this.goldPriceService = goldPriceService_1.GoldPriceService.getInstance();
        this.loadProducts();
    }
    static getInstance() {
        if (!ProductService.instance) {
            ProductService.instance = new ProductService();
        }
        return ProductService.instance;
    }
    loadProducts() {
        try {
            const productsPath = path_1.default.join(__dirname, '../../products.json');
            const productsData = fs_1.default.readFileSync(productsPath, 'utf8');
            this.products = JSON.parse(productsData);
        }
        catch (error) {
            console.error('Ürün verileri yüklenemedi:', error);
            this.products = [];
        }
    }
    getProductsWithPrices() {
        return __awaiter(this, void 0, void 0, function* () {
            const goldPricePerOz = yield this.goldPriceService.getGoldPrice();
            const goldPricePerGram = this.goldPriceService.convertOzToGram(goldPricePerOz);
            return this.products.map(product => {
                const price = (product.popularityScore + 1) * product.weight * goldPricePerGram;
                const popularityScoreOutOf5 = Math.round(product.popularityScore * 5 * 10) / 10;
                return Object.assign(Object.assign({}, product), { price: Math.round(price * 100) / 100, popularityScoreOutOf5 });
            });
        });
    }
    getProductsWithFilters(minPrice, maxPrice, minPopularity, maxPopularity) {
        return __awaiter(this, void 0, void 0, function* () {
            let products = yield this.getProductsWithPrices();
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
        });
    }
}
exports.ProductService = ProductService;
