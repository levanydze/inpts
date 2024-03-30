"use client";
import { useSession } from "next-auth/react";
import Restaurant from "./restaurant/Restaurant";
import { restaurantClientData } from "./restaurant/clientsData";

export default function Home() {
  const session = useSession();
  const activeUser = session?.data?.user?.email ?? "";

  return (
    <div>
      {restaurantClientData.map((client) =>
        client.email.includes(activeUser) ? (
          <Restaurant
            name={client.name}
            key={client.company}
            company={client.company}
            categories={client.categories}
          />
        ) : null
      )}
      {!restaurantClientData.some((client) =>
        client.email.includes(activeUser)
      ) && (
        <p className="pt-40 text-center text-2xl">
          There is no available data for you
        </p>
      )}
    </div>
  );
}
