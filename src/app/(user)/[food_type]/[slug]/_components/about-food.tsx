"use client";
import ReactMarkdown from "react-markdown";
import { Food } from "@prisma/client";

interface AboutFoodProps {
  food: Food;
}

export const AboutFood = ({ food: { name, description } }: AboutFoodProps) => {
  return (
    <section className="border rounded-xl p-5">
      <h1 className="text-3xl font-bold font-bungee_spice">About {name}</h1>
      <ReactMarkdown className="mt-5">{description}</ReactMarkdown>
    </section>
  );
};
