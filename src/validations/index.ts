import * as z from "zod";

export const OrderSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  phone: z
    .string()
    .refine(
      (value) =>
        (value.length === 11 && value.startsWith("01")) ||
        (value.length === 10 && value.startsWith("1")),
      "Please Enter a Valid phone number"
    ),
  address: z
    .string()
    .min(5, "Address is too short")
    .max(100, "Address is too long"),
});
