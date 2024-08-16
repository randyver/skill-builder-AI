"use client"

import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { hammer, inter } from "./font";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/navbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isNavBarActive, setIsNavBarActive] = useState(false);
  return (
    <html lang="en">
      <body className={`${hammer.variable} ${inter.variable}`}>
      <SessionProvider>
          <NavBar 
            isNavBarActive={isNavBarActive} 
            setIsNavBarActive={setIsNavBarActive} 
          />
          <main>{children}</main>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
