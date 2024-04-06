"use client";

import { cn } from "@/lib/utils";
import { Image } from "./image";

interface AvatarProps {
  image: string;
  alt?: string;
  className?: string;
}

export const Avatar = ({ image, alt = "Avatar", className }: AvatarProps) => {
  return (
    <Image
      src={image}
      alt={alt}
      className={cn("bg-accent rounded-full size-8", className)}
    />
  );
};
