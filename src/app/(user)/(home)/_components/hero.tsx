"use client";

import { Image } from "@/components/image";
import { Container } from "@/components/container";
import { ImagesZoomInOut } from "./images-zoom-in-out";
import { WhileInView } from "@/components/while-in-view";

export const Hero = () => {
  return (
    <div className="w-full h-screen bg-background">
      <Container
        element="section"
        className="-translate-y-7 z-30 h-full w-full flex flex-col-reverse sm:flex-row gap-10 items-center justify-center pb-16 px-8"
      >
        <WhileInView y={50} className="w-full max-w-[300px] sm:max-w-[400px]">
          <Image
            src="/hero_text.png"
            alt="Food image"
            className="aspect-[697/400]"
          />
        </WhileInView>
        <ImagesZoomInOut />
      </Container>
    </div>
  );
};
