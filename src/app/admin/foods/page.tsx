import { BreadCrumbs } from "@/components/bread-crumbs";
import { EmptyState } from "@/components/empty-state";
import { SearchInput } from "@/components/search-input";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { AdminFoodItem } from "./_components/admin-food-item";
import { NewFoodButton } from "./_components/new-food-button";
import { AdminSearchInput } from "../_components/admin-search-input";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const q = searchParams.q;
  const foods = await db.food.findMany({
    where: {
      ...(q
        ? {
            OR: [
              {
                type: {
                  contains: q,
                  mode: "insensitive",
                },
              },
              {
                name: {
                  contains: q,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="flex items-center gap-10 justify-between w-full">
        <BreadCrumbs
          items={[
            {
              label: "Dashboard",
              href: "/admin/dashboard",
            },
            {
              label: "Foods",
            },
          ]}
          animate={false}
        />
        <NewFoodButton />
      </div>
      <Separator />
      <AdminSearchInput />
      <section className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {foods.map((food) => (
          <AdminFoodItem food={food} key={food.id} />
        ))}
      </section>
      {!!!foods.length && (
        <EmptyState actionLabel="Clear Filters" actionUrl="/admin/foods" />
      )}
    </div>
  );
};

export default Page;
