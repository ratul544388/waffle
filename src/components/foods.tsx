import { Food } from "@prisma/client";
import { FoodItem } from "./food-item";
import { cn } from "@/lib/utils";

interface FoodsProps {
  foods: Food[];
  className?: string;
}

export const Foods = ({ foods, className }: FoodsProps) => {
  return (
    <section
      className={cn(
        "grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
        className
      )}
    >
      {foods.map((item) => (
        <FoodItem key={item.id} food={item} />
      ))}
    </section>
  );
};
