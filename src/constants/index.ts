import { ChefHat, LayoutDashboard, ListOrdered, Settings } from "lucide-react";

export const websiteName = "Waffle and Muscle Juice Bar";
export const phone = "01434343232";

export const adminNavLinks = [
  {
    label: "Dashbaord",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    disabled: true,
  },
  {
    label: "Foods",
    href: "/admin/foods",
    icon: ChefHat,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ListOrdered,
    disabled: true,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    disabled: true,
  },
]

export const foodTypes = [
  {
    label: "Waffles",
    slug: "waffles",
  },
  {
    label: "Drinks",
    slug: "drinks",
  },
];

export const extras = [
  {
    label: "Extra Nutella",
    price: 50,
  },
  {
    label: "Extra nuts",
    price: 30,
  },
  {
    label: "Whipped cream",
    price: 50,
  },
  {
    label: "ice cream vanila",
    price: 60,
  },
  {
    label: "Chocolate",
    price: 60,
  },
];

export const servings = [
  {
    label: "Chunkutia",
    map: "#",
  },
];

export const deliveryPartners = [
  {
    label: "Foodpanda",
    href: "#",
    image: "/delivery-partners/foodpanda.png",
  },
  {
    label: "Pathaw",
    href: "#",
    image: "/delivery-partners/pathaw.png",
  },
];

export const deliveryAvailable = ["Kaligonj", "Zinzira"];
