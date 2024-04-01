"use client";

import { Image } from "@/components/image";
import { Container } from "@/container";
import { ImagesZoomInOut } from "./images-zoom-in-out";

export const Hero = () => {
  return (
    <Container
      element="section"
      className="bg-color_blue h-screen w-full flex flex-col-reverse sm:flex-row gap-10 items-center justify-center pb-16 px-8"
    >
      <Image
        src="/hero_text.png"
        alt="Food image"
        className="max-w-[300px] sm:max-w-[400px] w-full aspect-[697/400]"
      />
      <ImagesZoomInOut />
    </Container>
  );
};
