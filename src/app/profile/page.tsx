"use client";
import axios from "axios";
import { Edit, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface User {
  username: string;
  email: string;
}

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getUserData = async () => {
    try {
      const res = await axios.post("/api/users/me");
      setUser(res.data);
    } catch (error) {
      setError("Failed to load user data.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to log out.");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-900 rounded-lg shadow-lg">
      <div className="flex items-center space-x-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white">{user?.username}</h1>
         
          <div className="mt-4 flex items-center space-x-4">
            <Link
              href={`mailto:${user?.email}`}
              className="text-indigo-500 hover:text-indigo-400 flex items-center"
            >
              <Mail className="mr-2 h-5 w-5" />
              {user?.email}
            </Link>
          
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-500 transition ease-in-out"
          >
            <User className="mr-2 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">About</h2>
        <p className="text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
          malesuada. Integer dapibus libero eget dui dignissim, in tristique
          ipsum aliquam.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Account Details
        </h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <User className="mr-2 h-6 w-6 text-gray-400" />
            <p className="text-gray-300">{user?.username}</p>
          </div>
          <div className="flex items-center">
            <Mail className="mr-2 h-6 w-6 text-gray-400" />
            <p className="text-gray-300">{user?.email}</p>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
