"use client";

import { foodTypes } from "@/constants/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { updateFood } from "@/actions/foods";
import { SelectExtra } from "@/app/admin/_components/select-extra";
import { useModalStore } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { FoodSchema } from "@/validations";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { ImageUpload } from "../image-upload";
import { RichTextEditor } from "../rich-text-editor";
import { Select } from "../select";
import { Button } from "../ui/button";
import { Modal } from "./modal";

export const UpdateFoodModal = () => {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const { isOpen, type, onOpen, data, onClose } = useModalStore();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { food } = data;

  const form = useForm<z.infer<typeof FoodSchema>>({
    resolver: zodResolver(FoodSchema),
    defaultValues: {
      name: "",
      image: "",
      price: undefined,
      extras: [],
      type: "",
    },
  });

  useEffect(() => {
    if (food) {
      const { name, price, image, extras, type, order, description } = food;
      form.reset({
        name,
        price,
        type,
        extras,
        image,
        order,
        description,
      });
    }
  }, [food, form]);

  console.log(form.getValues("description"));

  function onSubmit(values: z.infer<typeof FoodSchema>) {
    startTransition(() => {
      updateFood({ values, foodId: food?.id as string }).then(
        ({ success, error }) => {
          if (success) {
            toast.success(success);
            form.reset();
            onClose();
            router.refresh();
          } else {
            toast.error(error);
          }
        }
      );
    });
  }

  const title = `Update "${food?.name}"`;
  const description = "Review and confirm item details";

  return (
    <Modal
      open={isOpen && type === "updateFoodModal"}
      title={title}
      description={description}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("flex flex-col gap-6 px-5 py-2")}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input disabled={isPending} label="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    label="Select item type"
                    options={foodTypes.map(({ label }) => label)}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="extras"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <SelectExtra
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    onChange={field.onChange}
                    disabled={isPending}
                    value={field.value}
                    isUploadingImage={isUploadingImage}
                    onChangeUploadingImage={setIsUploadingImage}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="number"
                    label="Price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="number"
                    label="Order"
                    {...field}
                    required={false}
                  />
                </FormControl>
                <FormDescription>
                  You can specify the order of item. Lower numbers prioritize
                  top display.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="py-3 z-50 px-5 flex gap-5 sticky bottom-0 w-full bg-background">
        <Button
          onClick={() =>
            onOpen("deleteFoodModal", { name: food?.name, id: food?.id })
          }
          disabled={isPending || isUploadingImage}
          variant="destructive"
        >
          Delete
        </Button>
        <Button
          disabled={isPending || isUploadingImage}
          onClick={form.handleSubmit(onSubmit)}
          className="w-full"
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};
