"use client";

import { useState, type SyntheticEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignIn(provider: "google" | "github") {
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || "সামাজিক অ্যাকাউন্ট দিয়ে সাইন ইন করা যায়নি।",
        );
        setSocialLoading("");
      }
    } catch {
      toast.error("সামাজিক অ্যাকাউন্ট দিয়ে চালিয়ে যাওয়া যায়নি।");
      setSocialLoading("");
    }
  }

  return (
    <main className="container-main flex min-h-[75vh] items-center justify-center py-10 sm:py-14">
      <div className="w-full max-w-xl">
        <section className="w-full rounded-2xl border border-green-100 bg-white p-5 shadow-sm sm:p-7">
          <header className="mb-7 text-center">
            <h1 className="pb-2.5 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              সাইন ইন
            </h1>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                ইমেইল
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                required
                minLength={8}
                maxLength={128}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !!socialLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <LoaderCircle className="h-5 w-5 animate-spin" />}
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              disabled={loading || !!socialLoading}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
            >
              {socialLoading === "google" ? (
                <LoaderCircle className="h-5 w-5 animate-spin" />
              ) : (
                <FcGoogle className="h-5 w-5 shrink-0" />
              )}
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              disabled={loading || !!socialLoading}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
            >
              {socialLoading === "github" ? (
                <LoaderCircle className="h-5 w-5 animate-spin" />
              ) : (
                <FaGithub className="h-5 w-5 shrink-0" />
              )}
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-bold text-blue-800!  hover:underline!"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </section>

        <section className="mt-5 border-t border-gray-100 pt-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-green-700"
          >
            <ArrowLeft className="h-4 w-4" />
            হোম পেজে ফিরে যান
          </Link>
        </section>
      </div>
    </main>
  );
}
