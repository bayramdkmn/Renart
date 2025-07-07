import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white py-10 text-center text-gray-400 text-base font-avenir mt-16 border-t border-gray-100 flex flex-col items-center gap-4">
      <div className="flex gap-4 justify-center mb-2">
        <a
          href="#"
          className="hover:text-gray-700 transition"
          aria-label="Instagram"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="4" y="4" width="16" height="16" rx="4" />
            <circle cx="12" cy="12" r="4" />
          </svg>
        </a>
        <a
          href="#"
          className="hover:text-gray-700 transition"
          aria-label="Facebook"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" />
          </svg>
        </a>
        <a
          href="#"
          className="hover:text-gray-700 transition"
          aria-label="Twitter"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 15c1.5 0 4-2 4-6" />
          </svg>
        </a>
      </div>
      <div className="font-avenir">© 2025 Renart. Tüm hakları saklıdır.</div>
    </footer>
  );
}
