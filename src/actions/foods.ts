"use server";

import { db } from "@/lib/db";
import { formatString, isAdmin } from "@/lib/utils";
import { FoodSchema } from "@/validations";
import * as z from "zod";

export const getFoods = async ({
  q,
  take,
}: { q?: string; take?: number } = {}) => {
  const foods = await db.food.findMany({
    where: {
      ...(q
        ? {
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
          }
        : {}),
    },
    ...(take ? { take } : {}),
  });

  return foods;
};

export const createFood = async (values: z.infer<typeof FoodSchema>) => {
  try {
    const validatedFields = FoodSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const admin = await isAdmin();

    if (!admin) {
      return { error: "Unauthenticated" };
    }

    const slug = formatString(values.name, "slug");

    const existingFood = await db.food.findUnique({
      where: {
        name: values.name,
      },
    });

    if (existingFood) {
      return { error: "Name already exist. Try choosing another name." };
    }

    const totalItems = await db.food.count({
      where: {
        type: values.type,
      },
    });

    let order = values.order;

    if (order) {
      const existingOrder = await db.food.findFirst({
        where: {
          order,
          type: values.type,
        },
      });

      if (existingOrder)
        [
          await db.food.update({
            where: {
              id: existingOrder.id,
            },
            data: {
              order: totalItems + 1,
            },
          }),
        ];
    }

    if (!order) {
      order = totalItems + 1;
    }

    await db.food.create({
      data: {
        ...values,
        slug,
        order,
      },
    });

    return { success: "Item created" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const updateFood = async ({
  foodId,
  values,
}: {
  foodId: string;
  values: z.infer<typeof FoodSchema>;
}) => {
  try {
    const validatedFields = FoodSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const admin = await isAdmin();

    if (!admin) {
      return { error: "Unauthenticated" };
    }

    const slug = formatString(values.name, "slug");

    const existingFood = await db.food.findUnique({
      where: {
        name: values.name,
      },
    });

    if (existingFood && existingFood.id !== foodId) {
      return { error: "Name already exist. Try choosing another name." };
    }

    const order = values.order;

    if (order) {
      const existingOrder = await db.food.findFirst({
        where: {
          order,
          type: values.type,
        },
      });

      if (existingOrder) {
        const currentFood = await db.food.findUnique({
          where: {
            id: foodId,
          },
        });

        await db.food.update({
          where: {
            id: existingOrder?.id,
          },
          data: {
            order: currentFood?.order,
          },
        });
      }
    }

    await db.food.update({
      where: {
        id: foodId,
      },
      data: {
        ...values,
        slug,
        order,
      },
    });

    return { success: "Item Updated" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deleteFood = async (foodId: string) => {
  try {
    const admin = await isAdmin();

    if (!admin) {
      return { error: "Unauthenticated" };
    }

    await db.food.delete({
      where: {
        id: foodId,
      },
    });

    return { success: "Item Deleted" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
