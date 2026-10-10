"use client";

import { useEffect, useState } from "react";
import {
  getProducts,
  formatBanglaNumber,
  formatPrice,
  formatUnit,
  type Product,
} from "@/lib/api";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getProducts()
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
          setError(false);
        }
      })
      .catch((err) => {
        console.error("Could not load ticker prices:", err);
        if (!cancelled) {
          setError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="border-b border-green-100 bg-red-500 py-3 text-center text-sm text-white">
        বাজারদরের তথ্য এখন লোড করা যাচ্ছে না।
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="border-b border-green-100 bg-red-500 py-3 text-center text-sm text-white">
        বাজারদরের তথ্য লোড হচ্ছে...
      </div>
    );
  }

  const items = [...products, ...products];

  return (
    <div
      aria-label="বাজারদরের চলমান তালিকা"
      className="overflow-hidden border-b border-green-100 bg-white py-3 text-black"
    >
      <div className="ticker-track flex w-max items-center">
        {items.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            aria-hidden={index >= products.length}
            className="flex shrink-0 items-center gap-2 px-5 text-sm"
          >
            <span>{product.categoryIcon}</span>
            <span className="font-semibold">{product.nameBn}</span>
            <span className="text-black">
              {formatPrice(product.today)} / {formatUnit(product.unit).replace("প্রতি ", "")}
            </span>
            <span
              className={
                product.change.dir === "up"
                  ? "text-red-600"
                  : product.change.dir === "down"
                    ? "text-green-600"
                    : "text-green-300"
              }
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {formatBanglaNumber(product.change.pct)}%
            </span>
            {/* <span className="ml-3 bold text-black-700">•</span> */}
          </div>
        ))}
      </div>
    </div>
  );
}