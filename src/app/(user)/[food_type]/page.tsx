import { BreadCrumbs } from "@/components/bread-crumbs";
import { Container } from "@/components/container";
import { Foods } from "@/components/foods";
import { foodTypes } from "@/constants";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { food_type: string } }) => {
  const type = foodTypes.find((type) => type.slug === params.food_type)?.label;

  const foods = await db.food.findMany({
    where: {
      type,
    },
  });

  if (!type) {
    notFound();
  }

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
