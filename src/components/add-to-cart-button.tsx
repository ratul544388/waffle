"use client";

import { useCartStore } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Image } from "./image";
import { MotionButton } from "./motion-button";
import { Food } from "@prisma/client";

export const AddToCartButton = ({ food }: { food: Food }) => {
  const { addToCart } = useCartStore();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsAddingToCart(!isAddingToCart);
    addToCart(food);
    if (imageRef.current) {
      imageRef.current.style.position = "fixed";
    }
    setTimeout(() => {
      if (imageRef.current) {
        imageRef.current.style.top = "0px";
        imageRef.current.style.right = "0px";
      }
    }, 10);
  };

  useEffect(() => {
    if (buttonRef) {
      buttonRef.current?.getBoundingClientRect().top;
    }
  }, []);

  return (
    <div ref={buttonRef} className="">
      <MotionButton onClick={handleClick} variant="white">
        Add to cart
      </MotionButton>
      <div
        ref={imageRef}
        className={cn(
          "absolute z-20 top-10 right-10 transition-all duration-1000",
          isAddingToCart && "top-0 right-0"
        )}
      >
        <Image src={food.image} alt={food.name} className="size-20" />
      </div>
    </div>
  );
};
