import { FoodItem } from "@/components/food-item";
import { Heading } from "@/components/heading";
import { wafflesItems } from "@/constants";
import { Container } from "@/container";
import { Food } from "@/types";

interface WafflesProps {
  waffles: Food[];
  title: string;
}

export const Waffles = ({ waffles, title }: WafflesProps) => {
  return (
    <Container
      element="section"
      className="flex flex-col overflow-hidden items-center mt-16"
    >
      <Heading>{title}</Heading>
      <ul className="grid md:grid-cols-3 gap-12 w-full mt-10">
        {waffles.map((item, index) => (
          <FoodItem key={index} food={item} />
        ))}
      </ul>
    </Container>
  );
};
