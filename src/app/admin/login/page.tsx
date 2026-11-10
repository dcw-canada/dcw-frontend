// src/app/admin/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      if (typeof window !== "undefined") {
        localStorage.setItem("adminAuth", "true");
      }
      toast.success("Welcome back, Admin!");
      router.replace("/admin");
    } else {
      toast.error("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef1f0] p-4 font-sans">
      <div className="bg-white rounded-xl shadow-lg border border-[#d5dcdb] p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="DCW Solutions"
              width={180}
              height={55}
              priority
            />
          </Link>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-[#0b2f3a] tracking-tight">Admin Portal</h1>
          <p className="text-sm text-[#51626a] mt-1">Sign in to manage services & administrative tools</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#14434f] mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="admin"
              className="w-full border border-[#d5dcdb] px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f05a28] focus:border-transparent text-[#0b2f3a]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#14434f] mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full border border-[#d5dcdb] px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f05a28] focus:border-transparent text-[#0b2f3a]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0b2f3a] text-white py-3 rounded-lg font-bold hover:bg-[#14434f] transition-all shadow-md mt-2 flex items-center justify-center space-x-2"
          >
            <span>Sign In</span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-[#51626a] hover:text-[#0b2f3a] font-medium transition">
            ← Back to DCW Solutions
          </Link>
        </div>
      </div>
    </div>
  );
}
