"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductFilter from "../components/ProductFilter";
import { useState, useEffect } from "react";
import { Product } from "../types/product";
import ProductSlider from "../components/ProductSlider";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (filters: any = {}) => {
    try {
      setLoading(true);

      const hasActiveFilters = Object.keys(filters).length > 0;
      let url = "https://renart-backend.vercel.app/api/products";

      if (hasActiveFilters) {
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            queryParams.append(key, String(value));
          }
        });
        url += `/filter?${queryParams.toString()}`;
      }

      console.log("Fetching URL:", url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Ürünler yüklenemedi");
      }
      const data = await response.json();
      console.log("Received data:", data);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (filters: any) => {
    fetchProducts(filters);
  };

  const handleResetFilters = () => {
    fetchProducts();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-avenir">
      <Navbar />

      <ProductFilter onFilter={handleFilter} onReset={handleResetFilters} />

      <main className="flex-1 flex flex-col items-center justify-center px-2 pb-0 w-full">
        <div className="w-full flex flex-col items-center justify-center">
          {loading ? (
            <div className="text-center py-32">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-black font-avenir text-lg">
                Ürünler yükleniyor...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-32">
              <p className="text-red-600 font-avenir mb-4 text-lg">{error}</p>
              <button
                onClick={() => fetchProducts()}
                className="bg-[#E6CA97] text-white px-6 py-2 rounded-lg hover:bg-[#c9b06e] transition-colors font-avenir text-base shadow-md"
              >
                Tekrar Dene
              </button>
            </div>
          ) : (
            <ProductSlider products={products} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
