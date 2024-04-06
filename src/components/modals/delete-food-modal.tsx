"use client";

import { useModalStore } from "@/hooks/use-modal-store";
import { Modal } from "./modal";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { deleteFood } from "@/actions/foods";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const DeleteFoodModal = () => {
  const [isPending, startTransition] = useTransition();
  const { isOpen, type, onClose, data } = useModalStore();
  const { name, id } = data;
  const router = useRouter();

  const onDelete = () => {
    startTransition(() => {
      deleteFood(id as string).then(({ success, error }) => {
        if (success) {
          toast.success(success);
          router.refresh();
          onClose();
        } else {
          toast.error(error);
        }
      });
    });
  };

  return (
    <Modal
      open={isOpen && type === "deleteFoodModal"}
      title={`Delete "${name}"`}
      description={`Are you sure you want to delete "${name}". This action cannot be undone!`}
      disabled={isPending}
    >
      <div className="p-3 pt-6 flex items-center gap-5">
        <Button
          disabled={isPending}
          onClick={onClose}
          variant="outline"
          className="w-full"
        >
          Cencel
        </Button>
        <Button
          disabled={isPending}
          onClick={onDelete}
          variant="destructive"
          className="w-full"
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
