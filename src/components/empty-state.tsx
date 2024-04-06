"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Image } from "./image";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionUrl?: string;
  className?: string;
}

export const EmptyState = ({
  title = "No items found",
  description = "Oops! Looks like the term you are searching not found",
  actionLabel,
  actionUrl,
  className,
}: EmptyStateProps) => {
  return (
    <div className={cn("flex flex-col items-center mt-16", className)}>
      <Image
        src="/not-found-search-icon.png"
        alt="Not found"
        className="size-16"
      />
      <h1 className="font-bold text-primary text-4xl text-center mt-4">{title}</h1>
      <p className="text-muted-foreground text-center">{description}</p>
      {actionUrl && (
        <Link href={actionUrl} className={cn(buttonVariants(), "mt-6")}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
};
