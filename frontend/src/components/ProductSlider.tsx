import { useRef } from "react";
import { Product } from "../types/product";
import ProductCard from "./ProductCard";

interface ProductSliderProps {
  products: Product[];
}

export default function ProductSlider({ products }: ProductSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: "left" | "right") => {
    if (!sliderRef.current) return;
    const cardWidth =
      sliderRef.current.querySelector("div")?.clientWidth || 360;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -cardWidth * 1.1 : cardWidth * 1.1,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full flex justify-center items-center">
      <button
        onClick={() => scrollBy("left")}
        className="bg-white border border-[#E0E0E0] shadow-md rounded-full w-14 h-14 z-30 flex items-center justify-center mr-[30px]  transition hover:shadow-lg group"
        aria-label="Önceki"
        style={{ boxShadow: "0 2px 12px 0 rgba(224,224,224,0.18)" }}
      >
        <svg
          width="28"
          height="28"
          fill="none"
          stroke="#222"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <div
        ref={sliderRef}
        className="flex py-10 overflow-x-auto scrollbar-auto scroll-smooth snap-x snap-mandatory max-w-7xl px-2"
      >
        {products.map((product, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 snap-center mx-6"
            style={{ width: "260px" }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <button
        onClick={() => scrollBy("right")}
        className="bg-white border border-[#E0E0E0] shadow-md rounded-full w-14 h-14 z-30 flex items-center justify-center ml-[30px] transition hover:shadow-lg group"
        aria-label="Sonraki"
        style={{ boxShadow: "0 2px 12px 0 rgba(224,224,224,0.18)" }}
      >
        <svg
          width="28"
          height="28"
          fill="none"
          stroke="#222"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
