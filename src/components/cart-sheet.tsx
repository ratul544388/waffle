import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MotionButton } from "./motion-button";
import { OrderItem } from "./order-item";
import { useEffect, useState } from "react";
import { CartItem as CartItemType } from "@/types";
import { useCartStore } from "@/hooks/use-cart";
import { CartItem } from "./cart-item";
import { useModalStore } from "@/hooks/use-modal-store";
import { useOrderStore } from "@/hooks/use-order-store";

interface CartSheetProps {}

export const CartSheet = ({}: CartSheetProps) => {
  const { cart, setCart } = useCartStore();
  const { orders, setOrders } = useOrderStore();
  const { onOpen } = useModalStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const localCart: CartItemType[] = JSON.parse(
      localStorage.getItem("waffle-cart") as string
    );
    if (localCart) {
      setCart(localCart);
    }
  }, [setCart]);

  const handleOrder = () => {
    setOpen(false);
    setOrders(cart);
    onOpen("orderModal", { clearCart: true });
  };

  const total = cart.reduce((total, item) => {
    return (total += item.food.price * item.quantity);
  }, 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="relative bg-transparent hover:bg-white/10"
        >
          <ShoppingCart className="size-6" />
          <span className="absolute top-1 right-1 bg-color_blue rounded-full font-medium text-xs size-4">
            {cart.length}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0">
        <div className="h-[50px] flex flex-col gap-2 pt-3 items-center justify-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <ShoppingCart className="size-5" />
            <p>Cart ({cart.length})</p>
          </div>
          <Separator className="" />
        </div>
        <ScrollArea className="h-[calc(100%_-_160px)] px-5">
          {cart ? (
            <ul className="space-y-3 pt-4">
              {cart.map((item) => (
                <CartItem key={item.id} cartItem={item} />
              ))}
            </ul>
          ) : (
            ""
          )}
        </ScrollArea>
        <Separator />
        <div className="py-3 px-5">
          <div className="flex justify-between text-muted-foreground font-medium text-lg">
            <h4>Total:</h4>
            <p className="font-bold text-blue-500">{formatPrice(total)}</p>
          </div>
          <Button
            disabled={!!!cart.length}
            onClick={handleOrder}
            className="w-full mt-3"
          >
            Order
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
