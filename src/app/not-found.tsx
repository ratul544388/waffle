import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NotFound = () => {
  return (
    <Container className="h-screen flex flex-col items-center justify-center pb-20">
      <h1 className="font-extrabold text-8xl bg-cover text-orange-500">Opps!</h1>
      <h2 className="font-bold text-xl mt-6 text-white">404 - PAGE NOT FOUND</h2>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        We couldn&apos;t find the page you requested. It might be unavailable or
        the URL might be incorrect.
      </p>
      <Link href="/" className={cn(buttonVariants(), "mt-5")}>
        GO TO HOMEPAGE
      </Link>
    </Container>
  );
};

export default NotFound;
