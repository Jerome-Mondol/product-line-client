"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.init.js";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa6";
import Link from "next/link.js";


export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, {
        displayName: name,
      });
      console.log(userCred);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Welcome Back</h1>
        <p className="text-center text-gray-500">Sign in to access your dashboard</p>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
            <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="text"
              placeholder="John doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="placeholder:text-gray-600 text-gray-600 w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="placeholder:text-gray-600 text-gray-600 w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="placeholder:text-gray-600  text-gray-600 w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold p-3 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Sign up
          </button>
        </form>

        <div className="flex items-center justify-center space-x-3">
          <span className="text-gray-400">or</span>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="text-gray-700 w-full flex items-center justify-center border border-gray-300 rounded-md p-3 hover:bg-gray-100 transition duration-200 space-x-2"
        >
          <FaGoogle />
          <span className="text-gray-700 font-medium">Sign uo with Google</span>
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
