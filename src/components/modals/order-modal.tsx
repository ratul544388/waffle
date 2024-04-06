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

import { useCartStore } from "@/hooks/use-cart";
import { useCrisp } from "@/hooks/use-crips";
import { useModalStore } from "@/hooks/use-modal-store";
import { useOrderStore } from "@/hooks/use-order-store";
import { calculateTotal, cn, formatPhone, formatPrice } from "@/lib/utils";
import { User } from "@/types";
import { OrderSchema } from "@/validations";
import { Check, EditIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MotionButton } from "../motion-button";
import { OrderItem } from "../order-item";
import { Button } from "../ui/button";
import { Modal } from "./modal";

export const OrderModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();
  const { openChat } = useCrisp();
  const { clearCart } = useCartStore();
  const { orders } = useOrderStore();
  const { createOrder } = useCrisp();
  const [isEditingUserInfo, setIsEditingUserInfo] = useState(false);
  const [user, setUser] = useState(false);

  const form = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  function onSubmit({
    values,
    saveUser,
  }: {
    values: z.infer<typeof OrderSchema>;
    saveUser?: boolean;
  }) {
    if (saveUser) {
      localStorage.setItem(
        "waffle-user",
        JSON.stringify({ name, phone, address })
      );
      setIsEditingUserInfo(false);
      toast.success("User info saved");
    } else {
      createOrder({ user: values, orderItems: orders });
      toast.success(
        "Your order was created. Thanks for ordering. We'll call you for the confirmation"
      );
      openChat();
      if (!user) {
        localStorage.setItem("waffle-user", JSON.stringify(values));
      }
      if (data.clearCart) {
        clearCart();
      }
      onClose();
    }
  }

  const name = form.getValues("name");
  const phone = form.getValues("phone");
  const address = form.getValues("address");

  useEffect(() => {
    const user: User = JSON.parse(
      localStorage.getItem("waffle-user") as string
    );
    if (user) {
      setUser(true);
      const { name, phone, address } = user;
      form.reset({
        name,
        phone,
        address,
      });
    }
  }, [form, isOpen]);

  const total = calculateTotal(orders);

  const title = orders?.length > 1 ? "Order" : `Order ${orders[0]?.food.name}`;
  const description = "Confirm your order";

  return (
    <Modal
      open={isOpen && type === "orderModal"}
      title={title}
      description={description}
    >
      <Form {...form}>
        <form
          className={cn(
            "flex flex-col gap-6 px-5 py-1",
            isEditingUserInfo && "pt-12"
          )}
        >
          {user && !isEditingUserInfo && (
            <ul className="flex flex-col items-start relative bg-secondary text-muted-foreground border rounded-xl p-4 text-xs font-medium font-inter">
              {[name, formatPhone(phone), address].map((item, index) => (
                <li key={index} className="line-clamp-1 text-start">
                  {item}
                </li>
              ))}
              <Button
                type="button"
                onClick={() => setIsEditingUserInfo(true)}
                variant="ghost"
                className="rounded-full absolute text-blue-500 hover:text-blue-500/90 right-2 top-1.5 hover:bg-accent"
                size="icon"
              >
                <EditIcon className="size-4" />
              </Button>
            </ul>
          )}
          {(isEditingUserInfo || !user) && (
            <div className="flex flex-col gap-6 relative">
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
              <div className="flex items-center justify-between absolute top-0 inset-x-0 -translate-y-[calc(100%_+_8px)]">
                <p className="font-medium text-sm">Update Your Info</p>
                <Button
                  type="button"
                  onClick={form.handleSubmit((values) =>
                    onSubmit({ values, saveUser: true })
                  )}
                  variant="ghost"
                  className="rounded-full text-black hover:text-black bg-green-500 hover:bg-green-500/90"
                  size="icon"
                >
                  <Check className="size-4" />
                </Button>
              </div>
            </div>
          )}
          <ul className="space-y-4">
            {orders?.map((item) => (
              <OrderItem orderItem={item} key={item.id} />
            ))}
          </ul>
        </form>
      </Form>
      <div className="py-3 px-5 flex items-center gap-8 sticky bottom-0 w-full bg-background">
        <div className="text-sm font-bold">
          <h4>TOTAL:</h4>
          {formatPrice(total, "icon")}
        </div>
        <MotionButton
          onClick={form.handleSubmit((values) => onSubmit({ values }))}
          className="w-full"
        >
          Order
        </MotionButton>
      </div>
    </Modal>
  );
};
