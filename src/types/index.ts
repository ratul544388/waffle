import { Food } from "@prisma/client";

export type User = {
  name: string;
  phone: string;
  address: string;
};

export type CartItem = {
  id: string;
  food: Food;
  quantity: number;
  extras: Extra[];
};

export type OrderItem = {
  id: string;
  food: Food;
  quantity: number;
  extras: Extra[];
};

export type Extra = {
  label: string;
  price: number;
}
