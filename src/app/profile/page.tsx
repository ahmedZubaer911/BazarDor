"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LogOut, UserRound, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/signin");
    }

    if (user) {
      setName(user.name || "");
    }
  }, [isPending, user, router]);

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.error(error.message || "তথ্য আপডেট করা যায়নি।");
        return;
      }

      toast.success("আপনার তথ্য আপডেট হয়েছে!");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleSignOut() {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/signin");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  }

  if (isPending || !user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">প্রোফাইল লোড হচ্ছে...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 text-teft ">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            আমার প্রোফাইল
          </h1>
          <p className="mt-3 text-sm text-gray-500 sm:text-base">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
          </p>
        </header>

        <section className="mb-8 flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-7">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            {user.image ? (
              <Image
                src={user.image}
                alt="প্রোফাইল ছবি"
                width={72}
                height={72}
                unoptimized
                className="h-18 w-18 shrink-0 rounded-full border-2 border-green-100 object-cover"
              />
            ) : (
              <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                <UserRound size={34} />
              </div>
            )}

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-gray-900">
                {user.name || "ব্যবহারকারী"}
              </h2>
              <p className="mt-1 flex min-w-0 items-center gap-2 text-sm text-gray-500">
                <Mail size={16} className="shrink-0" />
                <span className="break-all">{user.email}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 sm:self-center"
          >
            <LogOut size={18} />
            সাইন আউট
          </button>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">তথ্য</h2>
          <p className="mt-1 text-sm text-gray-500">
            আপনার ব্যক্তিগত তথ্য পরিচালনা করুন
          </p>

          <form onSubmit={handleUpdate} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                নাম
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                ই-মেইল
              </label>
              <input
                id="email"
                type="email"
                value={user.email}
                readOnly
                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-500"
              />
              <p className="mt-2 text-xs text-gray-400">
                ইমেইল ঠিকানা এখানে পরিবর্তন করা যাবে না।
              </p>
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className=" w-full inline-flex items-center justify-center rounded-lg bg-green-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
            </button>
          </form>
        </section>

        <Link
          href="/"
          className="mt-6 flex justify-center text-center items-center gap-2 text-sm font-semibold text-green-600 transition hover:text-green-800"
        >
          <ArrowLeft size={17} />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}