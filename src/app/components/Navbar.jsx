"use client";

import { useState } from "react";
import Link from "next/link";
import { logOut } from "@/lib/auth";

export function Navbar({ isLoggedIn = false, loading }) {
  const [user, setUser] = useState(isLoggedIn || null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const publicLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Categories", path: "/categories" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const privateLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Products", path: "/products" },
    { label: "Add Product", path: "/add-product" },
    { label: "My Products", path: "/my-products" },
  ];

  const links = isLoggedIn ? privateLinks : publicLinks;

  const handleLogout = async (e) => {
    e.preventDefault();
    await logOut();
    setUser(null);
    setIsMenuOpen(false); 
  }

  return (
    <nav className="fixed top-0 w-full bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              ProductLine
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
            
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <button 
                    onClick={handleLogout} 
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-gray-700 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-gray-700 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-gray-700 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {links.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="flex flex-col space-y-2 pt-4 border-t">
                {isLoggedIn ? (
                  <button 
                    onClick={handleLogout} 
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-center hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link 
                      href="/login" 
                      className="text-gray-700 hover:text-blue-600 font-medium text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      href="/register" 
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}