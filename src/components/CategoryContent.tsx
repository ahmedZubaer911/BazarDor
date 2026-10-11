"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getCategories,
  getProducts,
  type Category,
  type Product,
} from "@/lib/api";
import ProductCard from "@/components/ProductCard";

type SortOption = "default" | "low-high" | "high-low";

export default function CategoryContent({ slug }: { slug: string }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<SortOption>("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setLoading(true);
      setError(false);

      try {
        const [categoryData, productData] = await Promise.all([
          getCategories(),
          getProducts(),
        ]);

        if (!cancelled) {
          setCategories(categoryData);
          setProducts(productData);
        }
      } catch {
        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const category = categories.find((item) => item.slug === slug);

  const categoryProducts = products.filter(
    (product) => product.category === slug,
  );

  const sortedProducts = [...categoryProducts];

  if (sort === "low-high") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sort === "high-low") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  if (loading) {
    return (
      <main className="container-main py-10">
        <div className="mb-8 h-10 w-56 animate-pulse rounded-lg bg-gray-200" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-36 animate-pulse rounded-2xl bg-white shadow-sm"
            />
          ))}
        </div>

        <p className="mt-4 text-center text-gray-500">
          ক্যাটাগরির পণ্য লোড হচ্ছে...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container-main py-16 text-center">
        <h1 className="text-2xl font-extrabold text-gray-900">
          তথ্য লোড করা যায়নি
        </h1>
        <p className="mt-3 text-gray-600">
          ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
        >
          আবার চেষ্টা করুন
        </button>
      </main>
    );
  }

  if (!category || categoryProducts.length === 0) {
    return (
      <main className="container-main py-16 text-center">
        <div className="text-5xl">🔎</div>
        <h1 className="mt-4 text-2xl font-extrabold text-gray-900">
          ক্যাটাগরি বা পণ্য পাওয়া যায়নি
        </h1>
        <p className="mt-3 text-gray-600">
          এই ক্যাটাগরিতে কোনো পণ্য নেই, অথবা ক্যাটাগরিটি সঠিক নয়।
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-green-600 px-5 py-3 font-semibold text-white! transition hover:bg-green-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

  return (
    <main className="container-main py-8 sm:py-10">
      <div className="mb-8 flex flex-col justify-between gap-5 p-2 sm:flex-row sm:items-center bg-white rounded-2xl">
        <div className="flex items-center gap-3">
          <span className="text-4xl" aria-hidden="true">
            {category.icon}
          </span>

          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              {category.nameBn}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {sortedProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 pr-2.5 sm:justify-end">
          <label
            htmlFor="category-sort"
            className="shrink-0 text-sm font-semibold text-gray-700"
          >
            সাজান:
          </label>

          <select
            id="category-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="min-w-0 rounded-xl border border-green-300 bg-white px-3 py-3 text-sm text-gray-800 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-high">দাম: কম থেকে বেশি</option>
            <option value="high-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div>
        <p className="mb-4 text-sm font-semibold text-gray-500 pl-1.5">
          মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
