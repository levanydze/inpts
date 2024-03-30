"use client";
import { useSession } from "next-auth/react";
import Restaurant from "./restaurant/Restaurant";
import { restaurantClientData } from "./restaurant/clientsData";

export default function Home() {
  const session = useSession();
  const activeUser = session?.data?.user?.email ?? "";

  return (
    <div>
      {restaurantClientData.map((client) => {
        if (client.email.includes(activeUser)) {
          return (
            <Restaurant
              key={client.company}
              company={client.company}
              categories={client.categories}
            />
          );
        }
        return null;
      })}
      {!activeUser && (
        <h1 className="pt-40 text-center text-2xl">
          There is no available data for you
        </h1>
      )}
    </div>
  );
}
