# Renart Backend API

## Kurulum
```bash
npm install
npm run dev
```

## API Endpoint'leri

### 1. Tüm Ürünleri Getir
```
GET http://localhost:3000/api/products
```

### 2. Fiyat Filtresi
```
GET http://localhost:3000/api/products/filter?minPrice=100&maxPrice=500
```

### 3. Popülerlik Filtresi
```
GET http://localhost:3000/api/products/filter?minPopularity=4&maxPopularity=5
```

### 4. Hem Fiyat Hem Popülerlik Filtresi
```
GET http://localhost:3000/api/products/filter?minPrice=200&maxPrice=1000&minPopularity=3.5&maxPopularity=5
```


## Fiyat Hesaplama
Fiyat = (popularityScore + 1) × weight × goldPrice (gram başına USD) 