"use server";

import { db } from "@/lib/db";

export const search = async (q: string) => {
  const foods = await db.food.findMany({
    where: {
      OR: [
        {
          type: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: q,
            mode: "insensitive",
          },
        },
      ],
    },
  });


  return foods;
};
