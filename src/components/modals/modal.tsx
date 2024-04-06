"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useModalStore } from "@/hooks/use-modal-store";

interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  disabled?: boolean;
}

export const Modal = ({
  open,
  title,
  description,
  children,
  disabled,
}: ModalProps) => {
  const { onClose } = useModalStore();

  const handleClose = () => {
    if (disabled) return;
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[100dvh] overflow-auto p-0 gap-0">
        <DialogHeader className="sticky top-0 bg-background z-10 p-5">
          <DialogTitle className="font-lemon">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <Button
            disabled={disabled}
            onClick={onClose}
            className="absolute top-1 right-2"
            size="icon"
            variant="ghost"
          >
            <X className="size-6" />
          </Button>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
