"use client";
import axios from "axios";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDis, setButtonDis] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);
      toast.success(res.data.message);
      console.log(res.data);
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
    setLoading(false);
    setUser({ email: "", password: "" });
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDis(false);
    } else {
      setButtonDis(true);
    }
  }, [user]);
  return (
    <div className="max-w-md w-full space-y-8 p-8 rounded-xl shadow-2xl bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white">Sign in</h1>
        <p className="mt-2 text-base text-gray-400">Sign in to your account</p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSignup}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-lg shadow-sm">
          <div className="mb-4">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base"
              placeholder="Email address"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
        </div>

        <div className="flex items-center justify-end mb-6">
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-indigo-500 hover:text-indigo-400"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading || buttonDis}
            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-lg disabled:opacity-35 disabled:cursor-not-allowed text-white ${
              loading ? "bg-indigo-400" : "bg-indigo-600"
            } hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out`}
          >
            {loading ? (
              <Loader className="animate-spin h-6 w-6 text-white" />
            ) : (
              "Sign in"
            )}
          </button>
        </div>
        <div className="text-center text-sm text-gray-500">
          Dont have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-indigo-500 hover:text-indigo-400"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
