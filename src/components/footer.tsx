"use client";

import { PhoneCall } from "lucide-react";
import {
  deliveryAvailable,
  deliveryPartners,
  foodPandaLink,
  phone,
  servings,
  socialLinks,
  websiteName,
} from "@/constants";
import Link from "next/link";
import { Container } from "@/components/container";
import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import { toast } from "sonner";

export const Footer = () => {
  return (
    <footer className="uppercase mt-20">
      <Container
        element="section"
        className="pt-20 px-12 pb-14 flex gap-10 flex-wrap justify-center sm:justify-between bg-orange-500 font-lemon"
      >
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl">Call us for order</h2>
          <div className="flex items-center gap-2">
            <FaPhone className="size-4" />
            <p
              onClick={() => {
                navigator.clipboard.writeText(phone);
                toast.success("Phone number copied");
              }}
              className="font-mono cursor-pointer text-lg font-bold"
            >
              {phone}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center">
          <h2 className="font-semibold text-xl">Order via</h2>
          <Link href={foodPandaLink} className="bg-white py-2 px-4">
            <Image
              src="/foodpanda.svg"
              alt="foodpanda"
              width={190}
              height={40}
              className="object-cover"
            />
          </Link>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-xl">Connect with us</h2>
          <ul className="flex gap-3">
            {socialLinks.map(({ image, label, href }) => (
              <li key={label}>
                <Link href={href} key={href}>
                  <Image
                    src={image}
                    alt={label}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container
        element="section"
        className="py-8 flex justify-center bg-neutral-900 text-sm font-medium text-white"
      >
        <p className="text-center text-sm">
          © 2024 {websiteName} | ALL RIGHT RESOLVED
        </p>
      </Container>
    </footer>
  );
};
