import { Inter } from "next/font/google";
import { Hammersmith_One } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const hammer = Hammersmith_One({
  subsets: ["latin"],
  variable: "--font-hammersmith",
  display: "swap",
  weight: "400",
});