import { ReactNode } from "react";

export default function authLayout({ children }: { children: ReactNode }) {
  return (
    <div className="pt-20 flex items-center justify-center">{children}</div>
  );
}
