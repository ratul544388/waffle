import { useCartStore } from "@/hooks/use-cart";
import { useModalStore } from "@/hooks/use-modal-store";
import { useOrderStore } from "@/hooks/use-order-store";
import { calculateTotal, formatPrice } from "@/lib/utils";
import { CartItem as CartItemType } from "@/types";
import { ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CartItem } from "./cart-item";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Image } from "./image";
import { MotionButton } from "./motion-button";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { useRouter } from "next/navigation";

interface CartSheetProps {}

export const CartSheet = ({}: CartSheetProps) => {
  const router = useRouter();
  const { cart, setCart } = useCartStore();
  const { setOrders } = useOrderStore();
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

  const total = calculateTotal(cart);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="relative bg-transparent text-white hover:bg-white/10"
        >
          <ShoppingCart className="size-6" />
          <span className="absolute top-1 right-1 bg-color_blue rounded-full font-medium text-xs size-4">
            {cart.length}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0" hideCloseButton>
        <div className="realtive h-[50px] flex flex-col gap-2 pt-3 items-center justify-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <ShoppingCart className="size-5" />
            <p>Cart ({cart.length})</p>
          </div>
          <Separator className="" />
          <Button
            onClick={() => setOpen(false)}
            variant="ghost"
            size="icon"
            className="absolute right-1.5 top-1 text-muted-foreground"
          >
            <X className="size-6" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100%_-_160px)] px-5 pb-0.5">
          {!!cart.length ? (
            <ul className="space-y-3 pt-4">
              {cart.map((item) => (
                <CartItem key={item.id} cartItem={item} />
              ))}
            </ul>
          ) : (
            <div className="flex items-center flex-col h-[calc(100vh_-_162px)] justify-center">
              <h1 className="font-bold text-3xl text-center text-muted-foreground font-lemon">
                Oops! Your Cart is Empty.
              </h1>
              <p className="text-center text-muted-foreground mt-2">
                Let&apos;s Add something delicious!
              </p>
              <MotionButton
                onClick={() => {
                  setOpen(false);
                  router.push("/waffles");
                }}
                variant="outline"
                className="mt-5"
              >
                Continue shopping
                <MdOutlineArrowRightAlt className="size-8" />
              </MotionButton>
            </div>
          )}
        </ScrollArea>
        <Separator />
        <div className="py-3 px-5">
          <div className="flex justify-between text-muted-foreground font-medium text-lg">
            <h4 className="font-semibold">TOTAL</h4>
            <p className="font-bold text-white">{formatPrice(total)}</p>
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
