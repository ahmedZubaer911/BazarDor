
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/api";

export default function ProductGrid({
  products,
}: {
  products: Product[];
}) {
  return (
    <section id="সব-পণ্য" className="scroll-mt-40">
      <div className="mb-5">
        <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
          সব পণ্যের বাজারদর
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          বর্তমানে {products.length}টি পণ্যের তথ্য পাওয়া গেছে।
        </p>
      </div>

      {products.length === 0 ? (
        <p className="rounded-xl border border-green-100 bg-[#f9fcf7] p-6 text-gray-500">
          কোনো পণ্যের তথ্য পাওয়া যায়নি।
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
