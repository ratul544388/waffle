import { Bungee_Spice, Inter, Lemon } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const lemon = Lemon({
  subsets: ["latin"],
  weight: ["400"],
  adjustFontFallback: false,
  variable: "--font-lemon",
});

const bungee_spice = Bungee_Spice({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bungee_spice",
  adjustFontFallback: false,
});

// export const fontsClass = `${inter.variable}`

export const fontsClass = `${inter.variable} ${lemon.variable} ${bungee_spice.variable}`;
