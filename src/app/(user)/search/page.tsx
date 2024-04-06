import { getFoods } from "@/actions/foods";
import { BreadCrumbs } from "@/components/bread-crumbs";
import { Container } from "@/components/container";
import { Foods } from "@/components/foods";
import { redirect } from "next/navigation";
import React from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const q = searchParams.q;
  if (!q) {
    redirect("/");
  }
  const foods = await getFoods({ q });

  return (
    <Container className="flex flex-col gap-4">
      <BreadCrumbs
        items={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "search",
            href: "/search",
          },
          {
            label: q,
          },
        ]}
      />
      <Foods foods={foods} />
    </Container>
  );
};

export default SearchPage;
