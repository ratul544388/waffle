import { BreadCrumbs } from "@/components/bread-crumbs";
import { Container } from "@/components/container";
import { Foods } from "@/components/foods";
import { foodTypes } from "@/constants";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: { food_type: string };
}

export function generateMetadata({ params: { food_type } }: PageProps) {
  const type = foodTypes.find((type) => type.slug === food_type)?.label || "";
  return {
    title: type,
  };
}

const getTypeBySlug = (slug: string) => {
  return foodTypes.find((type) => type.slug === slug)?.label as string;
};

const Page = async ({ params: { food_type } }: PageProps) => {
  const type = getTypeBySlug(food_type);

  if (!type) {
    notFound();
  }

  const foods = await db.food.findMany({
    where: {
      type,
    },
  });

  return (
    <Container className="flex flex-col gap-4">
      <BreadCrumbs
        items={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: type,
          },
        ]}
      />
      <Foods foods={foods} />
    </Container>
  );
};

export default Page;
