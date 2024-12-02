import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const Header: React.FC = () => {
  const { user, login, logout, signup, showLoginForm, setShowLoginForm } =
    useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      setShowLoginForm(false);
    } catch (error: any) {
      setError(error.message || "Authentication failed");
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product Review System</h1>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>
      {showLoginForm && !user && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-96"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {isSignup ? "Sign Up" : "Login"}
            </h2>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                {error}
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-gray-700"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-gray-700"
                required
                minLength={6}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                {isSignup ? "Sign Up" : "Login"}
              </button>
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-blue-500 hover:text-blue-600 underline"
              >
                {isSignup
                  ? "Already have an account? Login"
                  : "Need an account? Sign Up"}
              </button>
              <button
                type="button"
                onClick={() => setShowLoginForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
