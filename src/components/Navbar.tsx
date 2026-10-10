"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { getCategories, type Category } from "@/lib/api";
import type { ReactNode } from "react";
import Image from "next/image";

export default function Navbar({ date }: { date: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((error) => {
        console.error("Could not load categories:", error);
      });
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-green-100 bg-white">
      <div className="container-main flex min-h-22 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center bg-green-500 rounded-xl">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর লোগো"
              width={18}
              height={28}
              priority
              className="object-contain"
            />
          </div>

          <div>
            <span className="block text-xl font-extrabold text-black-600 sm:text-2xl mb-1.5">
              বাজার দর
            </span>
            {date}
          </div>
        </Link>

        <div className="hidden items-center gap-3 sm:flex">
          {loggedIn ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-lg border border-green-200 px-3 py-2 text-sm font-medium text-green-800"
              >
                <UserRound size={17} />
                প্রোফাইল
              </Link>
              <button
                onClick={() => setLoggedIn(false)}
                className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold text-green-800 hover:bg-green-50"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white! shadow-md hover:bg-green-700"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
        <button
          type="button"
          aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-green-800 hover:bg-green-50 sm:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* desktop category links */}
      <nav className="hidden border-t border-b border-gray-100 sm:block">
        <div className="container-main flex items-center justify-center gap-2 overflow-x-auto">
          {categories.map((category) => {
            const href = `/category/${category.slug}`;
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={category.id}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 border-b-2 px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "border-green-700 bg-green-50 text-white"
                    : "border-transparent text-gray-600 rounded-2xl hover:border-green-300 hover:text-green-800 hover:bg-green-400"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.nameBn}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile category links */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white p-4 sm:hidden">
          <nav className="grid grid-cols-2 gap-2">
            {categories.map((category) => {
              const href = `/category/${category.slug}`;
              const active =
                pathname === href || pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={category.id}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-3 py-3 text-sm font-medium ${
                    active
                      ? "bg-green-100 text-white"
                      : "bg-gray-50 text-gray-70 rounded-2xl hover:bg-green-300 hover:text-green-800"
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.nameBn}
                </Link>
              );
            })}
          </nav>

          <div className="mt-3 flex gap-2">
            {loggedIn ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-lg border border-green-700 px-3 py-2 text-center text-sm text-green-800"
                >
                  প্রোফাইল
                </Link>
                <button
                  onClick={() => {
                    setLoggedIn(false);
                    setMenuOpen(false);
                  }}
                  className="flex-1 rounded-lg bg-gray-100 px-3 py-2 text-sm"
                >
                  সাইন আউট
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-lg border border-green-700 px-3 py-2 text-center text-sm text-green-800 hover:bg-green-300"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-lg bg-green-700 px-3 py-2 text-center text-sm text-white! hover:bg-green-800"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
