import Image from "next/image";
import { Suspense } from "react";
import BanglaDate from "@/components/BanglaDate";

export default function Hero() {

  return (
    <section className="mb-12 overflow-hidden rounded-3xl bg-white px-6 py-8 sm:px-10 sm:py-10 lg:px-14">
      <div className="grid items-center gap-8 md:grid-cols-2">
        {/* Left: Date and hero content */}
        <div className="flex flex-col items-start">
          <div className="mb-6 flex h-8 w-fit items-center rounded-2xl bg-green-200 px-3 text-sm font-medium text-green-700">
            <Suspense fallback={<span>তারিখ লোড হচ্ছে...</span>}>
              <BanglaDate />
            </Suspense>
          </div>

          <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            আজকের বাজারের
            <br />
            দাম এক নজরে
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            className="mt-7 inline-flex items-center rounded-xl bg-green-600 px-7 py-4 font-bold text-white! transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        {/* Right: Hero image */}
        <div className="relative flex min-h-56 items-center justify-center md:min-h-80">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের নিত্যপ্রয়োজনীয় পণ্য"
            width={600}
            height={450}
            priority
            className="h-auto max-h-80 w-full object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
