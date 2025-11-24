// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap' // Add this for better loading
});

export const metadata = {
  title: "My App",
  description: "Dashboard app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body 
        className="antialiased"
        suppressHydrationWarning={true}
      >
        <NavbarWrapper />
        {children}
        
        {/* Client-side cleanup script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Clean up extension attributes after hydration
              if (typeof window !== 'undefined') {
                document.body.removeAttribute('cz-shortcut-listen');
              }
            `,
          }}
        />
      </body>
    </html>
  );
}