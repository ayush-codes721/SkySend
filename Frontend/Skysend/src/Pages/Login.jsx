import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState, authToken } from "../atoms/AppAtoms";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, Setauth] = useRecoilState(authState);
  const [token, SetToken] = useRecoilState(authToken);

  useEffect(() => {
    if (auth == true) {
      navigate("/");
    }
  }, [auth]);
  async function handleSubmit(e) {
    if (auth == true) {
      navigate("/");
    }
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );

      toast.success(data.message);
      navigate("/");
      console.log(data);

      SetToken(data.data.accessToken);

      setPassword("");
      setUsername("");
      Setauth(true);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white shadow-xl rounded-lg p-8 w-96">
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-700">
          Log In
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-lg font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              id="username"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-purple-600 text-white text-lg font-bold py-3 rounded-lg shadow-md transition duration-300 hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
              Log In
            </button>
          </div>
        </form>

        {/* Already have an account section */}
        <div className="text-center mt-6">
          <p className="text-gray-700">
            Dont have account?{" "}
            <Link
              to="/signup"
              className="text-purple-600 font-bold hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
