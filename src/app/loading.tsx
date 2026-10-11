export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl animate-pulse px-4 py-8">
      <div className="mb-6 h-8 w-48 rounded bg-gray-200" />

      <div className="mb-8 h-24 rounded-xl bg-gray-200" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="rounded-xl border p-4">
            <div className="mb-4 h-32 rounded-lg bg-gray-200" />
            <div className="mb-3 h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-1/2 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}