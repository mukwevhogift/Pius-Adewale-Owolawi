"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    // Check if user is admin
    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("role")
      .eq("email", email)
      .single();

    if (!adminUser) {
      setError("You do not have admin access");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative">
      {/* Back to Home Button - Top Left */}
      <Link 
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
      >
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all">
          <i className="ri-arrow-left-line text-xl"></i>
        </div>
        <span className="font-medium hidden sm:inline">Back to Home</span>
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-admin-line text-4xl text-white"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-gray-600 mt-2">Sign in to manage content</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
            <i className="ri-error-warning-line"></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <i className="ri-mail-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <i className="ri-lock-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <i className="ri-loader-4-line animate-spin"></i>
                Signing in...
              </>
            ) : (
              <>
                <i className="ri-login-box-line"></i>
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Protected by Supabase Authentication</p>
        </div>

        {/* Back to Home Link - Bottom */}
        <div className="mt-6 text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <i className="ri-home-line"></i>
            Visit Public Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
