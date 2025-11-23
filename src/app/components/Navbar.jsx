"use client";

import { useState } from "react";
import Link from "next/link";
import { logOut } from "@/lib/auth";

export function Navbar({ isLoggedIn = false, loading }) {
    const [user, setUser ] = useState(isLoggedIn || null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const publicLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Products", path: "/products" },
  ];

  const privateLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Products", path: "/products" },
    { label: "Add Products", path: "/add-products" },
    { label: "My Products", path: "/my-products" },
  ];

  const links = isLoggedIn ? privateLinks : publicLinks;

  const handleLogout = async (e) => {
    e.preventDefault();
    await logOut();
    setUser(null)
  }

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
       
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          ProductLine
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-6">
          {links.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* DESKTOP AUTH BUTTON */}
        <div className="hidden md:block">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                Logout
              </button>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Explore Now
            </Link>
          )}
        </div>

        {/* MOBILE MENU ICON */}
        <button
          className="md:hidden text-3xl text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileOpen && (
        <div className="md:hidden w-full bg-white shadow-md flex flex-col gap-4 p-5 z-40">
          {links.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="text-gray-700 text-lg hover:text-blue-600"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* MOBILE AUTH BUTTON */}
          {isLoggedIn ? (
              <button onClick={handleLogout} className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                Logout
              </button>
          ) : (
            <Link
              href="/login"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center"
              onClick={() => setMobileOpen(false)}
            >
              Explore Now
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
