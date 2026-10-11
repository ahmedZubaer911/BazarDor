export const instant = false;

import CategoryContent from "@/components/CategoryContent";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <CategoryContent slug={slug} />;
}