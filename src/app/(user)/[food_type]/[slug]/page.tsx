import { BreadCrumbs } from "@/components/bread-crumbs";
import { Image } from "@/components/image";
import { Button } from "@/components/ui/button";
import { WhileInView } from "@/components/while-in-view";
import { extras, foodTypes } from "@/constants";
import { Container } from "@/components/container";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";
import { ActionButtons } from "./_components/action-buttons";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { AddOns } from "@/components/add-ons";
import { AboutFood } from "./_components/about-food";

const Page = async ({
  params,
}: {
  params: { food_type: string; slug: string };
}) => {
  const food = await db.food.findUnique({
    where: {
      slug: params.slug,
    },
  });

  const type = foodTypes.find((type) => type.slug === params.food_type);

  if (!food || food.type !== type?.label) {
    notFound();
  }

  return (
    <Container className="flex flex-col w-full gap-4">
      <BreadCrumbs
        items={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: food.type,
            href: `/${type.slug}`,
          },
          {
            label: food.name,
          },
        ]}
      />
      <WhileInView
        y={100}
        className="grid w-full sm:grid-cols-2 gap-10 items-center max-w-[900px] mx-auto"
      >
        <Image src={food.image} alt={food.name} className="" />
        <div className="">
          <h1 className="font-bold text-xl font-lemon">{food.name}</h1>
          <p className="font-medium text-sm mt-0.5">{food.type}</p>
          <p className="mt-3 text-lg font-medium font-anton">
            {formatPrice(food.price)}
          </p>
          <ActionButtons food={food} />
        </div>
      </WhileInView>
      <WhileInView y={100}>
        <Separator className="mt-12 mb-8" />
      </WhileInView>
      <div className="flex items-center lg:items-start flex-col lg:flex-row gap-16">
        <AddOns extras={extras} />
        <AboutFood food={food} />
      </div>
    </Container>
  );
};

export default Page;
