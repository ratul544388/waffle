"use client";
import * as NextImage from "next/image";
import { cn } from "@/lib/utils";

interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export const Image = ({ src, alt = "Image", className }: ImageProps) => {
  return (
    <div className={cn("relative w-full aspect-square overflow-hidden", className)}>
      <NextImage.default src={src} alt={alt} className="object-cover" fill />
    </div>
  );
};
