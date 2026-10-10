import Link from "next/link";
import {
  formatBanglaNumber,
  formatPrice,
  formatUnit,
  type Product,
} from "@/lib/api";

export default function ProductCard({ product }: { product: Product }) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const badgeStyle = isUp
    ? "bg-red-100 text-red-700"
    : isDown
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-600";

  const symbol = isUp ? "▲" : isDown ? "▼" : "—";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-green-100 bg-white p-4 transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
    >
      {/* Row 1: Emoji + product name + unit */}
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white text-4xl">
          {product.categoryIcon || "🛒"}
        </div>

        <div className="min-w-0">
          <h3 className="font-bold leading-6 text-gray-900 group-hover:text-green-800">
            {product.nameBn}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {formatUnit(product.unit)}
          </p>
        </div>
      </div>

      {/* Row 2: Today's price + change badge */}
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-green-100 pt-3">
        <div className="min-w-0">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="mt-1 text-base font-extrabold text-green-900 sm:text-lg">
            {formatPrice(product.today)}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${badgeStyle}`}
        >
          {symbol} {formatBanglaNumber(product.change.pct)}%
        </span>
      </div>
    </Link>
  );
}
