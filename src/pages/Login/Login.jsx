import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, LockKeyhole } from "lucide-react";

import { useAuthStore } from "../../store/AuthStore";

const Login = () => {
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("client");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //console.log(email, role)

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    login(email, role);

    // Redirect based on role
    if (role === "admin") {
      navigate("/admin/events");
    } else {
      navigate("/events");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Calendar className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Event Planner
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <div className="mt-1">
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      id="client"
                      name="role"
                      type="radio"
                      checked={role === "client"}
                      onChange={() => setRole("client")}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="client"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Client
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="admin"
                      name="role"
                      type="radio"
                      checked={role === "admin"}
                      onChange={() => setRole("admin")}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="admin"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Admin
                    </label>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                <span className="flex items-center">
                  <LockKeyhole className="h-3 w-3 mr-1" />
                  This is a demo app. No password required.
                </span>
              </p>
            </div>

            <div>
              <button type="submit" className="w-full text-sm px-4 py-2 rounded-md font-bold cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
