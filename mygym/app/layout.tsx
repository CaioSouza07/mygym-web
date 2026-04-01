"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  if (!isMobile) {
    return (
      <html lang="pt-br" className="dark">
        <body className={inter.className}>
          <div className="flex h-screen items-center justify-center">
            <p className="text-center text-2xl">
              Este aplicativo só está disponivel em dispostivos mobile.
            </p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
