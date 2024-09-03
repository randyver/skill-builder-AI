"use client";
import { useState, useEffect } from "react";

export default function UserDetail() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl xl:text-4xl text-center font-bold md:mb-10">
        Profile
      </h1>
      <div className="text-center">
        <p className="text-lg">ID: {user?.id}</p>
        <p className="text-lg">Name: {user?.name}</p>
        <p className="text-lg">Email: {user?.email}</p>
      </div>
    </div>
  );
}
