"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/user";

export const changeMode = async () => {
  try {
    const user = await currentUser();

    if (!user || user.role !== "ADMIN") {
      return { error: "Permission denied" };
    }

    const mode = user.mode === "ADMIN" ? "USER" : "ADMIN";
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        mode,
      },
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
