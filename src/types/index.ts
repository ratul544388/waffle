export type User = {
  name: string;
  phone: string;
  address: string;
};

export type Food = {
  id: string;
  image: string;
  name: string;
  price: number;
};

export type CartItem = {
  id: string;
  food: Food;
  quantity: number;
};

export type OrderItem = {
  id: string;
  food: Food;
  quantity: number;
}
