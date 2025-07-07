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
exports.GoldPriceService = void 0;
const axios_1 = __importDefault(require("axios"));
class GoldPriceService {
    constructor() {
        this.cachedPrice = null;
        this.lastFetchTime = 0;
        this.CACHE_DURATION = 5 * 60 * 1000;
    }
    static getInstance() {
        if (!GoldPriceService.instance) {
            GoldPriceService.instance = new GoldPriceService();
        }
        return GoldPriceService.instance;
    }
    getGoldPrice() {
        return __awaiter(this, void 0, void 0, function* () {
            const now = Date.now();
            if (this.cachedPrice !== null && (now - this.lastFetchTime) < this.CACHE_DURATION) {
                return this.cachedPrice;
            }
            try {
                const response = yield axios_1.default.get('https://api.metals.live/v1/spot/gold');
                if (response.data && response.data.length > 0) {
                    const goldData = response.data[0];
                    const price = goldData.price;
                    this.cachedPrice = price;
                    this.lastFetchTime = now;
                    return price;
                }
                else {
                    const defaultPrice = 2000;
                    this.cachedPrice = defaultPrice;
                    this.lastFetchTime = now;
                    return defaultPrice;
                }
            }
            catch (error) {
                console.error('Altın fiyatı çekilemedi:', error);
                const defaultPrice = 2000;
                this.cachedPrice = defaultPrice;
                this.lastFetchTime = now;
                return defaultPrice;
            }
        });
    }
    convertOzToGram(pricePerOz) {
        return pricePerOz / 31.1035;
    }
}
exports.GoldPriceService = GoldPriceService;
