import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth with Next JS",
  description: "Next JS authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Toaster />
      <body className={inter.className}>
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200">
          {children}
        </div>
        <footer className="bg-gray-900">
          <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 lg:px-8">
            <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
              <li>
                <Link
                  className="text-gray-100 transition hover:text-gray-100/75"
                  href="/"
                >
                  {" "}
                  Home{" "}
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-100 transition hover:text-gray-100/75"
                  href="/login"
                >
                  {" "}
                  Login{" "}
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-100 transition hover:text-gray-100/75"
                  href="/signup"
                >
                  {" "}
                  Register{" "}
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-100 transition hover:text-gray-100/75"
                  href="/profile"
                >
                  {" "}
                  Profile{" "}
                </Link>
              </li>
            </ul>
            <div className="flex mt-6 text-sm text-gray-400 justify-center">
              &copy; {new Date().getFullYear()} Auth with Next JS. All rights
              reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
