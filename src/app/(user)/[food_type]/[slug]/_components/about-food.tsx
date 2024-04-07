"use client";
import ReactMarkdown from "react-markdown";
import { Food } from "@prisma/client";
import { WhileInView } from "@/components/while-in-view";

interface AboutFoodProps {
  food: Food;
}

export const AboutFood = ({ food: { name, description } }: AboutFoodProps) => {
  return (
    <WhileInView y={50} className="border rounded-xl p-5">
      <h1 className="text-3xl font-bold font-bungee_spice">
        <span className="font-lemon">About</span> {name}
      </h1>
      <ReactMarkdown className="mt-5">{description}</ReactMarkdown>
    </WhileInView>
  );
};
