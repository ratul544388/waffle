"use client";

import { getFoods } from "@/actions/foods";
import { cn, formatPrice, getSlugFromType } from "@/lib/utils";
import { Food } from "@prisma/client";
import { motion } from "framer-motion";
import { ImSpinner3 } from "react-icons/im";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { useDebounceValue, useOnClickOutside } from "usehooks-ts";
import { Image } from "./image";

export const SearchInput = ({
  className,
  isFocused,
  showPopup = true,
}: {
  className?: string;
  isFocused?: boolean;
  showPopup?: boolean;
  onChange?: (value: string) => void;
}) => {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounceValue(value, 500);
  const [results, setResults] = useState<Food[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const targetRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [notFound, setNotFound] = useState(false);

  useOnClickOutside(targetRef, () => setOpen(false));

  useEffect(() => {
    if (debouncedValue) {
      startTransition(() => {
        getFoods({ q: debouncedValue, take: 5 }).then((res) => {
          setResults(res);
          setNotFound(!!!res.length);
        });
      });
    }
    setOpen(!!value);
  }, [debouncedValue, value]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!debouncedValue) return;
    router.push(`/search?q=${debouncedValue}`);
    setOpen(false);
  };

  useEffect(() => {
    if (inputRef.current && isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full max-w-[600px] mx-auto relative", className)}
    >
      <input
        ref={inputRef}
        onFocus={() => setOpen(!!value)}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="Search waffles and Drinks"
        className="peer h-9 w-full pl-3 pr-10 placeholder:text-sm outline-none rounded-md focus:ring focus-visible:ring-[1.5px] focus:ring-color_blue text-muted-foreground"
      />
      <button
        type="submit"
        className="rounded-r-md size-9 bg-color_blue absolute right-0 top-0 grid place-content-center"
      >
        <Search className="size-4" />
      </button>
      {open && showPopup && (
        <div
          ref={targetRef}
          className="flex flex-col absolute overflow-hidden inset-x-0 rounded-md bg-secondary border py-3 top-full mt-1"
        >
          {results.map(({ id, name, image, slug, type, price }) => (
            <Link
              onClick={() => setOpen(false)}
              href={`/${getSlugFromType(type)}/${slug}`}
              key={id}
              className="flex items-center gap-3 px-3 py-1.5 hover:bg-accent"
            >
              <Image src={image} alt={name} className="size-12" />
              <div className="text-sm font-medium text-muted-foreground">
                <p>{name}</p>
                <p>{formatPrice(price)}</p>
              </div>
            </Link>
          ))}
          {notFound && (
            <p className="text-muted-foreground font-medium px-3 text-center">
              No results found!
            </p>
          )}
          {isPending && (
            <ImSpinner3 className="size-4 absolute top-1.5 right-2 animate-spin text-muted-foreground" />
          )}
        </div>
      )}
    </form>
  );
};
