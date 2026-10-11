export const instant = false;

import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import {
  getProducts,
  formatBanglaNumber,
  formatPrice,
  formatUnit,
} from "@/lib/api";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?reason=auth-required");
  }
  const { slug } = await params;

  let products;

  try {
    products = await getProducts();
  } catch {
    return (
      <main className="container-main py-12">
        <p className="text-center text-red-700">
          পণ্যের তথ্য লোড করা যায়নি। পরে আবার চেষ্টা করুন।
        </p>
      </main>
    );
  }

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets ?? [];

  const lowestMarket = markets.length
    ? markets.reduce((lowest, market) =>
        market.min < lowest.min ? market : lowest,
      )
    : null;

  const highestMarket = markets.length
    ? markets.reduce((highest, market) =>
        market.max > highest.max ? market : highest,
      )
    : null;

  const minPrice = lowestMarket?.min ?? product.today;
  const maxPrice = highestMarket?.max ?? product.today;

  const marketAverage = markets.length
    ? Math.round(
        markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0,
        ) / markets.length,
      )
    : product.today;

  const priceDifference = Math.abs(product.today - product.yesterday);
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const changeColor = isUp
    ? "text-red-600"
    : isDown
      ? "text-green-700"
      : "text-gray-500";

  const changeSymbol = isUp ? "▲" : isDown ? "▼" : "—";

  const changeDescription = isUp
    ? "দাম বেড়েছে"
    : isDown
      ? "দাম কমেছে"
      : "দামের পরিবর্তন নেই";

  return (
    <main className="container-main space-y-8 py-8 sm:py-10">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-sm text-gray-500"
      >
        <Link href="/" className="hover:text-green-700">
          হোম
        </Link>
        <span>/</span>
        <span>{product.categoryNameBn}</span>
        <span>/</span>
        <span className="font-semibold text-gray-900">{product.nameBn}</span>
      </nav>

      {/* Product summary */}
      <section className="rounded-3xl border border-green-100 bg-white p-5 sm:p-8">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-[#edf5e9] text-5xl sm:h-28 sm:w-28 sm:text-6xl">
              {product.categoryIcon || "🛒"}
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                {formatUnit(product.unit)} · {product.categoryNameBn}
              </p>

              <p className={`mt-3 text-sm font-semibold`}>
                গতকালের তুলনায় আজ {changeDescription} ·{" "}
                {formatPrice(priceDifference)}
              </p>
            </div>
          </div>

          <div className="border-t flex-1 p-2.5 justify-between items-center rounded-2xl border-green-100 pt-5 text-left md:border-l md:border-t-0 md:pl-8 md:pt-0 md:text-center">
            <p className="text-sm text-gray-500">আজকের দাম</p>
            <p className="mt-1 text-4xl font-extrabold text-green-900">
              {formatBanglaNumber(product.today)}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              টাকা/{formatUnit(product.unit).replace("প্রতি ", "")}
            </p>
            <p className={`mt-2 font-bold ${changeColor}`}>
              {changeSymbol} {formatBanglaNumber(product.change.pct)}%
            </p>
          </div>
        </div>
      </section>

      {/* Price summary */}
      <section className="bg-white p-3.5 rounded-2xl">
        <h2 className="mb-4 text-xl font-extrabold text-gray-900 sm:text-2xl">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-green-100 bg-white p-5">
            <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
            <p className="mt-2 text-2xl font-extrabold text-green-700">
              {formatPrice(minPrice)}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {lowestMarket ? `সবচেয়ে কম দামের বাজার` : "বাজারের তথ্য নেই"}
            </p>
          </div>

          <div className="rounded-2xl border border-green-100 bg-white p-5">
            <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>
            <p className="mt-2 text-2xl font-extrabold text-red-600">
              {formatPrice(maxPrice)}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {highestMarket ? `সবচেয়ে বেশি দামের বাজার` : "বাজারের তথ্য নেই"}
            </p>
          </div>

          <div className="rounded-2xl border border-green-100 bg-white p-5">
            <p className="text-sm text-gray-500">গড় দাম</p>
            <p className="mt-2 text-2xl font-extrabold text-green-700">
              {formatPrice(marketAverage)}
            </p>
            <p className="mt-2 text-sm text-gray-500">প্রতি কেজি-এর হিসাব</p>
          </div>
        </div>

        {/* Market-wise prices */}
        <div className="mt-5">
          <h2 className="mb-2 text-xl font-extrabold text-gray-900 sm:text-2xl">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length === 0 ? (
            <div className="rounded-2xl border border-green-100 bg-white p-8 text-center text-gray-500">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </div>
          ) : (
            <div className="mt-5">
              <div className="overflow-x-auto rounded-2xl border border-green-100 bg-white">
                <table className="w-full min-w-162.5 text-left text-sm">
                  <thead className="bg-[#edf5e9] text-gray-700">
                    <tr>
                      <th className="px-5 py-4 font-bold">বাজার</th>
                      <th className="px-5 py-4 font-bold">বিভাগ</th>
                      <th className="px-5 py-4 font-bold">সর্বনিম্ন</th>
                      <th className="px-5 py-4 font-bold">সর্বোচ্চ</th>
                      <th className="px-5 py-4 font-bold">গড়</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-green-100">
                    {markets.map((market, index) => (
                      <tr
                        key={`${market.market}-${market.division}-${index}`}
                        className="transition hover:bg-[#f9fcf7]"
                      >
                        <td className="px-5 py-4 font-semibold text-gray-900">
                          {market.market}
                        </td>
                        <td className="px-5 py-4 text-gray-600">
                          {market.division}
                        </td>
                        <td className="px-5 py-4 font-medium text-green-700">
                          {formatPrice(market.min)}
                        </td>
                        <td className="px-5 py-4 font-medium text-red-600">
                          {formatPrice(market.max)}
                        </td>
                        <td className="px-5 py-4 font-medium text-gray-900">
                          {formatPrice(
                            Math.round((market.min + market.max) / 2),
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
