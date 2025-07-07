"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://renart-backend.vercel.app");
      if (!response.ok) {
        throw new Error("Ürünler yüklenemedi");
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-avenir">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-2 pb-0 w-full">
        <div className="w-full flex flex-col items-center justify-center">
          {loading ? (
            <div className="text-center py-32">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600 font-avenir text-lg">
                Ürünler yükleniyor...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-32">
              <p className="text-red-600 font-avenir mb-4 text-lg">{error}</p>
              <button
                onClick={fetchProducts}
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
