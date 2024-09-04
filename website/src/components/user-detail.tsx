"use client";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function UserDetail() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/api/profile", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setUser(data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details");
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  if (loading) return <div className="flex justify-center items-center mt-20 text-gray-700 text-lg">Loading...</div>;
  if (error) return <div className="flex justify-center items-center mt-20 text-red-500 text-lg">{error}</div>;

  return (
    <div className="p-6 max-w-md mx-auto mt-20 font-hammer">
      <div className="flex flex-col items-center mb-6">
        <FaUserCircle className="text-blue-600 text-6xl mb-4" />
        <h1 className="text-3xl font-bold text-center text-blue-600">Profile</h1>
      </div>
      <div className="text-center">
        <p className="text-lg font-medium text-gray-800 mb-2">Name: <span className="font-normal text-gray-600">{user?.name}</span></p>
        <p className="text-lg font-medium text-gray-800">Email: <span className="font-normal text-gray-600">{user?.email}</span></p>
      </div>
    </div>
  );
}
