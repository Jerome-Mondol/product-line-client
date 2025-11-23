// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "My App",
  description: "Dashboard app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {/* NavbarWrapper handles client auth logic */}
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}
