import { auth } from "@clerk/nextjs";
import { db } from "./db";

export const currentUser = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const user = db.user.findUnique({
    where: {
      userId,
    },
  });

  return user;
};

export const isAdmin = async () => {
  const { userId } = auth();
  if (!userId) return false;

  const user = await db.user.findUnique({
    where: {
      userId,
      role: "ADMIN",
    },
    select: {
      id: true,
    },
  });

  return !!user;
};
