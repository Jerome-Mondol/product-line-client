// app/components/NavbarWrapper.js
"use client";
import { useAuthListener } from "../hooks/useAuthListener";
import { Navbar } from "./Navbar";

export default function NavbarWrapper() {
  const { user, loading } = useAuthListener();

  return <Navbar isLoggedIn={!!user} loading={loading} />;
}
