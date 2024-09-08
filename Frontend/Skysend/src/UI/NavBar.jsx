import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState, authToken } from "../atoms/AppAtoms";

export default function NavBar() {
  const [auth, Setauth] = useRecoilState(authState);
  const [token, SetToken] = useRecoilState(authToken);
  const navigate = useNavigate();

  function handleLogout() {
    Setauth(false);
    SetToken(null);
    navigate("/login");
  }

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-6 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="text-white text-3xl mr-6 font-extrabold tracking-wide font-sans">
          🌐 SkySend
        </div>

        {/* Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-white text-lg px-6 py-3 rounded-full font-bold tracking-wide transition-all duration-300 hover:bg-purple-600 border-2 border-white hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
          >
            Home
          </Link>
          <Link
            to="/mail"
            className="text-white text-lg px-6 py-3 rounded-full font-bold tracking-wide transition-all duration-300 hover:bg-green-600 border-2 border-white hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
          >
            Send Mail
          </Link>
          <Link
            to="/history"
            className="text-white text-lg px-6 py-3 rounded-full font-bold tracking-wide transition-all duration-300 hover:bg-blue-600 border-2 border-white hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
          >
            Mail History
          </Link>
        </div>

        {/* Conditional Buttons */}
        <div className="ml-auto flex space-x-4">
          {auth ? (
            <button
              onClick={handleLogout}
              className="text-white bg-red-600 text-lg px-6 py-2 rounded-lg font-bold tracking-wide transition-all duration-300 hover:bg-red-700 border-2 border-red-600 hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-pink-500 bg-white text-lg px-6 py-2 rounded-lg font-bold tracking-wide transition-all duration-300 hover:bg-pink-200 hover:text-pink-600 border-2 border-white hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-purple-500 bg-white text-lg px-6 py-2 rounded-lg font-bold tracking-wide transition-all duration-300 hover:bg-purple-200 hover:text-purple-600 border-2 border-white hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
