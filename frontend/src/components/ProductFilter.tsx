import { useState } from "react";

interface FilterValues {
  minPrice?: number;
  maxPrice?: number;
  minPopularity?: number;
  maxPopularity?: number;
}

interface FilterProps {
  onFilter: (filters: FilterValues) => void;
  onReset: () => void;
}

export default function ProductFilter({ onFilter, onReset }: FilterProps) {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [popularityRange, setPopularityRange] = useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = useState(false);

  const handleApplyFilters = () => {
    const filters: FilterValues = {};

    if (priceRange.min) filters.minPrice = parseFloat(priceRange.min);
    if (priceRange.max) filters.maxPrice = parseFloat(priceRange.max);
    if (popularityRange.min)
      filters.minPopularity = parseFloat(popularityRange.min);
    if (popularityRange.max)
      filters.maxPopularity = parseFloat(popularityRange.max);

    onFilter(filters);
  };

  const handleReset = () => {
    setPriceRange({ min: "", max: "" });
    setPopularityRange({ min: "", max: "" });
    onReset();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 mb-4 sm:mb-8">
      <div className="flex justify-center mb-4 sm:mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-[#E6CA97] text-white px-4 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-[#c9b06e] transition-all duration-300 font-avenir text-sm sm:text-base shadow-lg flex items-center gap-2"
        >
          <svg
            width="16"
            height="16"
            className="sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
            />
          </svg>
          <span className="hidden sm:inline">
            {showFilters ? "Filtreleri Gizle" : "Filtreleri Göster"}
          </span>
          <span className="sm:hidden">{showFilters ? "Gizle" : "Filtre"}</span>
        </button>
      </div>

      <div
        className={`transition-all duration-500 overflow-hidden ${
          showFilters ? "h-full opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-8">
          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#E6CA97] rounded-full flex items-center justify-center">
                  <svg
                    width="12"
                    height="12"
                    className="sm:w-4 sm:h-4"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91 2.65.69 4.18 1.9 4.18 3.91-.01 1.83-1.38 2.83-3.12 3.16z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 font-avenir">
                  Fiyat Aralığı
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2 font-avenir">
                    Min Fiyat (USD)
                  </label>
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, min: e.target.value })
                    }
                    placeholder="Örn: 100"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E6CA97] focus:border-transparent transition-all font-avenir text-black text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2 font-avenir">
                    Max Fiyat (USD)
                  </label>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, max: e.target.value })
                    }
                    placeholder="Örn: 1000"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E6CA97] focus:border-transparent transition-all font-avenir text-black text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#E6CA97] rounded-full flex items-center justify-center">
                  <svg
                    width="12"
                    height="12"
                    className="sm:w-4 sm:h-4"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 font-avenir">
                  Popülerlik Skoru
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2 font-avenir">
                    Min Popülerlik (1-5)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={popularityRange.min}
                    onChange={(e) =>
                      setPopularityRange({
                        ...popularityRange,
                        min: e.target.value,
                      })
                    }
                    placeholder="Örn: 3.0"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E6CA97] focus:border-transparent transition-all font-avenir text-black text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2 font-avenir">
                    Max Popülerlik (1-5)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={popularityRange.max}
                    onChange={(e) =>
                      setPopularityRange({
                        ...popularityRange,
                        max: e.target.value,
                      })
                    }
                    placeholder="Örn: 5.0"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E6CA97] focus:border-transparent transition-all font-avenir text-black text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-10">
            <button
              onClick={handleReset}
              className="px-6 py-2 sm:px-8 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-avenir text-sm sm:text-base"
            >
              Sıfırla
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-6 py-2 sm:px-8 sm:py-3 bg-[#E6CA97] text-white rounded-lg hover:bg-[#c9b06e] transition-all duration-300 font-avenir text-sm sm:text-base shadow-lg"
            >
              Filtreleri Uygula
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
