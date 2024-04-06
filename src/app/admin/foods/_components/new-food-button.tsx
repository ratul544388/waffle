"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-modal-store";
import { PlusCircle } from "lucide-react";

export const NewFoodButton = () => {
  const { onOpen } = useModalStore();
  return (
    <Button
      className="gap-2"
      size="sm"
      onClick={() => onOpen("createFoodModal")}
    >
      New
      <PlusCircle className="size-4" />
    </Button>
  );
};
