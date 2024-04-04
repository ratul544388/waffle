import { Artboard } from "@/components/artboard";
import { wafflesItems } from "@/constants";
import { AddOns } from "./_components/add-ons";
import { Hero } from "./_components/hero";
import { Waffles } from "./_components/waffles";

export default function Home() {
  return (
    <>
      <Hero />
      <Waffles waffles={wafflesItems} title="Waffles" />
      <AddOns />
      <Artboard />
    </>
  );
}
