"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Incorrect password.");
    }
  }

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border border-gray-200 p-8 bg-white">
        <h1 className="text-2xl font-serif text-maroon text-center mb-6">
          SHAHANA Admin
        </h1>
        <label className="block text-sm text-gray-700 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 text-sm focus:border-maroon outline-none mb-4"
        />
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-maroon text-white py-3 text-sm tracking-wide hover:bg-maroon-dark transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}