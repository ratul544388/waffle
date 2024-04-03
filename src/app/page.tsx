import { wafflesItems, waffleStickItems } from "@/constants";
import { AddOns } from "./_components/add-ons";
import { Hero } from "./_components/hero";
import { Waffles } from "./_components/waffles";
import { Artboard } from "@/components/artboard";

export default function Home() {
  return (
    <main>
      <Hero />
      <Waffles waffles={wafflesItems} title="Waffles" />
      <Waffles waffles={waffleStickItems} title="Waffles on sticks" />
      <AddOns />
      <Artboard />
    </main>
  );
}
