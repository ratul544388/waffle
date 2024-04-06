import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { AdminMobileSidebar } from "./admin-mobile-sidebar";

export const AdminNavbar = () => {
  return (
    <nav className="sticky z-50 top-0 border-b shadow-sm  bg-background/40 backdrop-blur-md text-white mb-3 md:hidden">
      <Container className="py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AdminMobileSidebar />
          <Logo isAdmin />
        </div>
      </Container>
    </nav>
  );
};
