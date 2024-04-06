import { PhoneCall } from "lucide-react";
import { Image } from "./image";
import {
  deliveryAvailable,
  deliveryPartners,
  phone,
  servings,
  websiteName,
} from "@/constants";
import Link from "next/link";
import { Container } from "@/components/container";

export const Footer = () => {
  return (
    <footer className="uppercase mt-20">
      <Container
        element="section"
        className="pt-20 px-10 pb-14 flex gap-10 flex-wrap bg-neutral-800 justify-between"
      >
        <div className="font-bold">
          <Image
            src="/logos/logo.png"
            alt="Logo"
            className="size-32 bg-color_pink border-4 border-orange-950 rounded-full"
          />
          <h2 className="mt-5">Call us for order</h2>
          <div className="flex items-center gap-2">
            <PhoneCall className="size-4" />
            {phone}
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-extrabold text-lg">NOW SERVING</h2>
          {servings.map(({ label, map }) => (
            <Link
              href={map}
              key={label}
              className="font-semibold hover:underline decoration-orange-500"
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center flex-col gap-6">
          <div className="flex items-center gap-3">
            {deliveryPartners.map(({ image, href, label }) => (
              <Link href={href} key={label}>
                Image
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-col items-center">
            <h2 className="font-extrabold text-lg">Delivery Available</h2>
            {deliveryAvailable.map((item) => (
              <p key={item} className="font-semibld text-sm">
                {item}
              </p>
            ))}
          </div>
        </div>
      </Container>
      <Container
        element="section"
        className="py-8 flex justify-center bg-neutral-900 text-sm font-medium text-white"
      >
        <p className="text-center text-sm">© 2024 {websiteName} | ALL RIGHT RESOLVED</p>
      </Container>
    </footer>
  );
};
