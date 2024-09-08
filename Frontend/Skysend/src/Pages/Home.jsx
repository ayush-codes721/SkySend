import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState, authToken, userState } from "../atoms/AppAtoms";
import axios from "axios";

export default function Home() {
  const [auth, Setauth] = useRecoilState(authState);
  const [token, SetToken] = useRecoilState(authToken);
  const [user, Setuser] = useRecoilState(userState);
  const [loading, Setloading] = useState(true); // Default to true to show loading initially
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);

  useEffect(() => {
    async function getMyProfile() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );
        Setuser(response.data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        Setloading(false); // Set loading to false after the request completes
      }
    }

    if (auth && token) {
      getMyProfile();
    }
  }, [auth, token, Setuser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    ); // Show loading indicator
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Home Page</h1>
      {user && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">User Details</h2>
          <p className="text-lg mb-2">
            <span className="font-bold">ID:</span> {user.id}
          </p>
          <p className="text-lg mb-2">
            <span className="font-bold">Name:</span> {user.name}
          </p>
          <p className="text-lg mb-2">
            <span className="font-bold">Username:</span> {user.username}
          </p>
        </div>
      )}
    </div>
  );
}
