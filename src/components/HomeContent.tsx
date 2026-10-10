"use client";

import { useEffect, useState } from "react";
import ProductSection from "@/components/ProductSection";
import ProductGrid from "@/components/ProductGrid";
import { getProducts, type Product } from "@/lib/api";

export default function HomeContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
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
        console.error("Could not load homepage products:", err);

        if (!cancelled) {
          setError(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const risers = [...products]
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = [...products]
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-600">
        বাজারদর লোড হচ্ছে...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 p-6 text-center text-red-700">
        বাজারদর লোড করা যায়নি। অনুগ্রহ করে পেজটি রিফ্রেশ করুন।
      </div>
    );
  }

  return (
    <>
      <ProductSection
        title ={
          <>
            আজ দাম বেড়েছে <span className="text-red-600">▲</span>
          </>
        }
        subtitle="দাম বৃদ্ধির পরিমাণ অনুযায়ী শীর্ষ ৬টি পণ্য"
        products={risers}
      />

      <ProductSection
        title={
          <>
          আজ দাম কমেছে <span className="text-green-600">▼</span>
          </>
          }
        subtitle="দাম কমার পরিমাণ অনুযায়ী শীর্ষ ৬টি পণ্য"
        products={fallers}
      />

      <ProductGrid products={products} />
    </>
  );
}
