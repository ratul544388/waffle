import { Container } from "@/components/container";
import { FoodItem } from "@/components/food-item";
import { Heading } from "@/components/heading";
import { Food as FoodType } from "@prisma/client";

interface FoodsProps {
  foods: FoodType[];
  title: string;
}

export const Foods = ({ foods, title }: FoodsProps) => {
  return (
    <Container
      element="section"
      className="flex flex-col overflow-hidden items-center mt-16"
    >
      <Heading>{title}</Heading>
      <ul className="grid md:grid-cols-3 gap-12 w-full mt-10">
        {foods.map((item, index) => (
          <FoodItem key={index} food={item} />
        ))}
      </ul>
    </Container>
  );
};
