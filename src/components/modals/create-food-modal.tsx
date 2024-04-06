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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createFood } from "@/actions/foods";
import { SelectExtra } from "@/app/admin/_components/select-extra";
import { useModalStore } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { FoodSchema } from "@/validations";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ImageUpload } from "../image-upload";
import { RichTextEditor } from "../rich-text-editor";
import { Select } from "../select";
import { Button } from "../ui/button";
import { Modal } from "./modal";

export const CreateFoodModal = () => {
  const { isOpen, type, data, onClose } = useModalStore();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const form = useForm<z.infer<typeof FoodSchema>>({
    resolver: zodResolver(FoodSchema),
    defaultValues: {
      name: "",
      image: "",
      price: undefined,
      extras: [],
      type: "",
      order: undefined,
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof FoodSchema>) {
    startTransition(() => {
      createFood(values).then(({ success, error }) => {
        if (success) {
          toast.success(success);
          form.reset();
          onClose();
          router.refresh();
        } else {
          toast.error(error);
        }
      });
    });
  }

  const title = "Create a new Item";
  const description = "Fill up the form to create a new item";

  return (
    <Modal
      open={isOpen && type === "createFoodModal"}
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
                <FormLabel>Extras</FormLabel>
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
                <FormLabel>
                  Image <span className="ml-1 text-red-500">*</span>
                </FormLabel>
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
      <div className="py-3 px-5 z-30 sticky bottom-0 w-full bg-background">
        <Button
          disabled={isPending || isUploadingImage}
          onClick={form.handleSubmit(onSubmit)}
          className="w-full"
        >
          Create
        </Button>
      </div>
    </Modal>
  );
};
