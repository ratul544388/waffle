import { Artboard } from "@/components/artboard";
import { db } from "@/lib/db";
import { Foods } from "./_components/foods";
import { Hero } from "./_components/hero";
import { AddOns } from "@/components/add-ons";
import { extras } from "@/constants";

export default async function Home() {
  const waffles = await db.food.findMany({
    where: {
      type: "Waffles",
    },
  });

  const drinks = await db.food.findMany({
    where: {
      type: "Drinks",
    },
  });

  return (
    <>
      <Hero />
      <Foods foods={waffles} title="Waffles" />
      <Foods foods={drinks} title="Drinks" />
      <AddOns extras={extras} className="sm:mx-auto mt-16"/>
      <Artboard />
    </>
  );
}
