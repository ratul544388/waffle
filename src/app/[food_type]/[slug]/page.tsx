import { BreadCrumbs } from "@/components/bread-crumbs";
import { Image } from "@/components/image";
import { Button } from "@/components/ui/button";
import { WhileInView } from "@/components/while-in-view";
import { foodTypes, wafflesItems } from "@/constants";
import { Container } from "@/container";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";
import { ActionButtons } from "./_components/action-buttons";
import { Separator } from "@/components/ui/separator";

const Page = ({ params }: { params: { food_type: string; slug: string } }) => {
  const food = wafflesItems.find(
    ({ slug }) =>
      slug === params.slug &&
      foodTypes.some((type) => type.slug === params.food_type)
  );

  if (!food) {
    notFound();
  }
  return (
    <Container className="space-y-4">
      <BreadCrumbs
        items={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: food.type,
            href: `/${params.food_type.toLowerCase()}`,
          },
          {
            label: params.slug,
          },
        ]}
      />
      <WhileInView
        y={100}
        className="grid sm:grid-cols-2 gap-10 items-center max-w-[900px] mx-auto"
      >
        <Image src={food.image} alt={food.name} className="" />
        <div className="">
          <h1 className="font-bold text-xl font-lemon">{food.name}</h1>
          <p className="font-medium text-sm mt-0.5">{food.type}</p>
          <p className="mt-3 text-lg font-medium">{formatPrice(food.price)}</p>
          <ActionButtons food={food} />
        </div>
      </WhileInView>
      <Separator className="my-14"/>
    </Container>
  );
};

export default Page;
