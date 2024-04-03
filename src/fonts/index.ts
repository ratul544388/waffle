import {
  Inter,
  Caprasimo,
  Lemon,
  Potta_One,
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


// export const fontsClass = `${inter.variable}`

export const fontsClass = `${inter.variable} ${potta_one.variable} ${lemon.variable} ${caprasimo.variable}`;
