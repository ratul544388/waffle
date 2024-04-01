import { FoodItem } from "@/components/food-item";
import { Heading } from "@/components/heading";
import { waffles } from "@/constants";
import { Container } from "@/container";

export const Waffles = () => {
  return (
    <Container element="section" className="flex flex-col overflow-hidden items-center mt-16">
      <Heading>Waffles</Heading>
      <ul className="grid md:grid-cols-3 gap-12 w-full mt-10">
        {waffles.map((item, index) => (
          <FoodItem key={index} {...item} />
        ))}
      </ul>
    </Container>
  );
};
