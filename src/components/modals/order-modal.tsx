"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useModalStore } from "@/hooks/use-modal-store";
import { OrderSchema } from "@/validations";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { useCrisp } from "@/hooks/use-crips";
import { toast } from "react-toastify";

export const OrderModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();
  const { createOrder } = useCrisp();

  const form = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  function onSubmit(values: z.infer<typeof OrderSchema>) {
    createOrder(values);
    toast.success(
      "Your order was created. Thanks for ordering. We'll call you for the confirmation"
    );
    onClose();
  }

  return (
    <Dialog open={isOpen && type === "orderModal"} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order {data.name}</DialogTitle>
          <DialogDescription>
            Fill up the form to confirm the order
          </DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6 pt-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input label="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" phone label="Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input label="Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button>Submit</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
