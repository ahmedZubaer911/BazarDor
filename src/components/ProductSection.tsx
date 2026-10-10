
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/api";
import type { ReactNode } from "react";

type ProductSectionProps = {
  title: ReactNode;
  subtitle: string;
  products: Product[];
};

export default function ProductSection({
  title,
  subtitle,
  products,
}: ProductSectionProps) {
  return (
    <section className="mb-12">
      <div className="mb-5">
        <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>

      {products.length === 0 ? (
        <p className="rounded-xl border border-green-100 bg-[#f9fcf7] p-6 text-gray-500">
          এই মুহূর্তে কোনো পণ্য পাওয়া যায়নি।
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
