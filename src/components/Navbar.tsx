"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  UserRound,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getCategories, type Category } from "@/lib/api";
import type { ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function Navbar({ date }: { date: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [profileOpen, setProfileOpen] = useState(false);

  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const loggedIn = !!session?.user;

  const user = session?.user;
  const userName = user?.name || "ব্যবহারকারী";
  const userEmail = user?.email || "";
  const userImage = user?.image;

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((error) => {
        console.error("Could not load categories:", error);
      });
  }, []);

  async function handleSignOut() {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      setMenuOpen(false);
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-green-100 bg-white">
      <div className="container-main flex min-h-22 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center bg-green-500 rounded-xl">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর লোগো"
              width={9}
              height={9}
              priority
              className="h-5 w-5 object-contain"
            />
          </div>

          <div>
            <span className="mb-1.5 block text-xl font-extrabold text-gray-900 sm:text-2xl">
              বাজার দর
            </span>
            {date}
          </div>
        </Link>

        <div className="hidden items-center gap-3 sm:flex">
          {isPending ? (
            <div className="h-10 w-36 animate-pulse rounded-lg bg-gray-100" />
          ) : loggedIn ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                className="flex max-w-56 items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 transition hover:border-green-300 hover:bg-green-50"
              >
                {userImage ? (
                  <Image
                    src={userImage}
                    alt="প্রোফাইল ছবি"
                    width={36}
                    height={36}
                    unoptimized
                    className="h-9 w-9 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800">
                    <UserRound size={20} />
                  </span>
                )}

                <span className="max-w-32 truncate text-sm font-semibold text-gray-800">
                  {userName}
                </span>

                <ChevronDown
                  size={17}
                  className={`shrink-0 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-50 mt-2 w-72 pb-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl shadow-gray-900/15 ring-1 ring-black/5"
                >
                  <div className="border-b border-gray-100 px-4 py-4">
                    <p className="truncate font-bold text-gray-900">
                      {userName}
                    </p>
                    <p className="mt-1 truncate text-sm text-gray-500">
                      {userEmail}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    role="menuitem"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-extrabold text-gray-900 transition hover:bg-green-50"
                  >
                    {userImage ? (
                      <Image
                        src={userImage}
                        alt="প্রোফাইল ছবি"
                        width={32}
                        height={32}
                        unoptimized
                        className="h-8 w-8 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-800">
                        <UserRound size={18} />
                      </span>
                    )}
                    আমার প্রোফাইল
                  </Link>

                  <div className="border-t border-gray-100">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700"
                    >
                      <ArrowLeft size={19} />
                      <span>সাইন আউট</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
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
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-green-700"
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
                className={`shrink-0 border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "border-green-700 bg-green-500 rounded-2xl text-white!"
                    : "border-transparent text-gray-600! rounded-2xl hover:border-green-300 hover:text-white! hover:bg-green-400"
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
                  className={`rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-green-600 rounded-2xl text-white!"
                      : "bg-gray-50 text-gray-700! rounded-2xl hover:bg-green-300 hover:text-white!"
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
                  onClick={handleSignOut}
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
