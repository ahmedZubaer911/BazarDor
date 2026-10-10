import Hero from "@/components/Hero";
import HomeContent from "@/components/HomeContent";

export default function HomePage() {
  return (
    <main className="container-main py-8 sm:py-12">
      <Hero />
      <HomeContent />
    </main>
  );
}