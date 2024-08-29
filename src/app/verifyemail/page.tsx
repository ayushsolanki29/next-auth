"use client";
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const VerifyEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleUserEmail = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/users/verifyemail", { token });
      if (res.status === 200) {
        setIsVerified(true);
        setError(false);
        toast.success(res.data.message);
      } else {
        setError(true);
        setIsVerified(false);
      }
    } catch (err: any) {
      setError(true);
      setIsVerified(false);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setError(false);
    const userToken = searchParams.get("token");
    if (userToken) {
      setToken(userToken);
    }
  }, [searchParams]);

  return (
    <div className="max-w-md w-full space-y-8 p-8 rounded-xl shadow-2xl bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white">
          Verify Your Email
        </h1>
        <p className="mt-2 text-base text-gray-400">
          Verify your email to complete your registration.
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <button
            type="button"
            onClick={handleUserEmail}
            disabled={loading || isVerified}
            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-lg text-white ${
              loading || isVerified ? "bg-indigo-400" : "bg-indigo-600"
            } hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out`}
          >
            {loading ? (
              <Loader className="animate-spin h-6 w-6 text-white" />
            ) : isVerified ? (
              "Email Verified"
            ) : (
              "Verify Your Email"
            )}
          </button>
        </div>

        {isVerified && (
          <div className="text-center text-green-500">
            Email verified successfully. You can now login.
            <button
              onClick={() => router.push("/")}
              className="mt-4 w-full px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Login
            </button>
          </div>
        )}
        {error && (
          <div className="text-center text-red-500">
            There was an error verifying your email. Please try again.
          </div>
        )}
      </form>
    </div>
  );
};

export default VerifyEmailPage;
