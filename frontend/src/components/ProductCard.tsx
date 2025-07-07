"use client";

import { useState } from "react";
import { Product, ColorOption } from "../types/product";

interface ProductCardProps {
  product: Product;
}

const colorMeta = {
  yellow: { label: "Yellow Gold", color: "#E6CA97" },
  white: { label: "White Gold", color: "#D9D9D9" },
  rose: { label: "Rose Gold", color: "#E1A4A9" },
};

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<ColorOption>("yellow");

  return (
    <div
      className="flex flex-col border-t-gray-50 rounded-3xl shadow-xl w-full max-w-80 p-6 transition-transform hover:-translate-y-2 hover:shadow-2xl duration-200 "
      style={{ gap: "14px" }}
    >
      <div className="mb-2 w-full aspect-square shadow-sm rounded-image">
        <img
          src={product.images[selectedColor]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="w-full mb-0 ">
          <div className="font-montserrat-medium text-[#222] font-bold text-[15px] mb-0 leading-tight">
            {product.name}
          </div>
          <div className="font-montserrat-regular font-normal text-[15px] text-[#222] mb-0">
            ${product.price.toFixed(2)} USD
          </div>
        </div>
        <div className="flex mb-1 w-full">
          {(["yellow", "white", "rose"] as ColorOption[]).map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className="relative flex items-center justify-center p-0 focus:outline-none"
              style={{ width: 30, height: 30 }}
              aria-label={colorMeta[color].label}
            >
              <span
                className="absolute left-0 top-0"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "100%",
                  border: `1px solid ${
                    selectedColor === color ? "#222" : "transparent"
                  }`,
                  boxSizing: "border-box",
                  background: "transparent",
                }}
              />
              <span
                className="rounded-full"
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: colorMeta[color].color,
                  display: "inline-block",
                  zIndex: 1,
                  position: "relative",
                }}
              />
            </button>
          ))}
        </div>
        <div className="text-lg text-[#222] font-avenir-book text-[12px] w-full mt-4 ">
          {colorMeta[selectedColor].label}
        </div>
        <div className="flex items-center gap-1 mt-1 w-full">
          {(() => {
            const stars = [];
            const score = product.popularityScoreOutOf5;
            for (let i = 0; i < 5; i++) {
              let fill = "#E0E0E0";
              if (i < Math.floor(score)) fill = "#E6CA97";
              else if (i < score) fill = `url(#star-gradient-${i})`;
              stars.push(
                <svg
                  key={i}
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id={`star-gradient-${i}`}>
                      <stop
                        offset={`${(score - Math.floor(score)) * 100}%`}
                        stopColor="#E6CA97"
                      />
                      <stop
                        offset={`${(score - Math.floor(score)) * 100}%`}
                        stopColor="#E0E0E0"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M10 15.27L16.18 18l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 3.73L3.82 18z"
                    fill={fill}
                  />
                </svg>
              );
            }
            return stars;
          })()}
          <span className="ml-2 text-xs text-[#888] font-avenir-book text-[14px]">
            {product.popularityScoreOutOf5}/5
          </span>
        </div>
      </div>
    </div>
  );
}
