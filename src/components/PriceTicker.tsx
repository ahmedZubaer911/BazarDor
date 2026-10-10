const samplePrices = [
  { emoji: "🍚", name: "চাল", price: "৬৮ টাকা/কেজি", change: "▲ ২.১%", up: true },
  { emoji: "🧅", name: "পেঁয়াজ", price: "৬০ টাকা/কেজি", change: "▼ ১.৮%", up: false },
  { emoji: "🥔", name: "আলু", price: "৩৫ টাকা/কেজি", change: "▼ ৩.০%", up: false },
  { emoji: "🥚", name: "ডিম", price: "১৪০ টাকা/ডজন", change: "▲ ১.২%", up: true },
  { emoji: "🐟", name: "ইলিশ মাছ", price: "১,২০০ টাকা/কেজি", change: "— ০.০%", up: null },
  { emoji: "🫘", name: "মসুর ডাল", price: "১১০ টাকা/কেজি", change: "▲ ০.৭%", up: true },
];

export default function PriceTicker() {
  const items = [...samplePrices, ...samplePrices];

  return (
    <div
      aria-label="বাজারদরের চলমান তালিকা"
      className="overflow-hidden border-b border-green-100 bg-green-950 py-3 text-white"
    >
      <div className="ticker-track flex w-max items-center">
        {items.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            aria-hidden={index >= samplePrices.length}
            className="flex shrink-0 items-center gap-2 px-5 text-sm"
          >
            <span>{item.emoji}</span>
            <span className="font-semibold">{item.name}</span>
            <span className="text-green-100">{item.price}</span>
            <span
              className={
                item.up === null
                  ? "text-gray-300"
                  : item.up
                    ? "text-emerald-300"
                    : "text-red-300"
              }
            >
              {item.change}
            </span>
            <span className="ml-3 text-green-700">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}