import {
  Caprasimo,
  Inter,
  Lemon,
  Potta_One,
  Lora,
} from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const potta_one = Potta_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-potta_one",
  adjustFontFallback: false,
});
const lemon = Lemon({
  subsets: ["latin"],
  weight: ["400"],
  adjustFontFallback: false,
  variable: "--font-lemon",
});
const caprasimo = Caprasimo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-caprasimo",
  adjustFontFallback: false,
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-Lora",
  adjustFontFallback: false,
});

export const fontsClass = `${inter.variable} ${potta_one.variable} ${lemon.variable} ${caprasimo.variable} ${lora.variable}`;
