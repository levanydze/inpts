"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Restaurant from "./restaurant/Restaurant";
import { getClients } from "../../lib/cl";

interface Category {
  value: string;
  label: string;
  sort: number;
}

interface ClientData {
  name: string;
  company: string;
  email: string[];
  categories: Category[];
  domain: string;
}

export default function Home() {
  const session = useSession();
  const activeUser = session?.data?.user?.email ?? "";
  const [clientData, setClientData] = useState<ClientData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClients();
        setClientData(data);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 100000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div>
        {clientData.some((client) => client.email.includes(activeUser)) ? (
          clientData.map((client) =>
            client.email.includes(activeUser) ? (
              <Restaurant
                key={client.company}
                name={client.name}
                company={client.company}
                companyDomain={client.domain}
                categories={client.categories.sort((a, b) => a.sort - b.sort)}
              />
            ) : null
          )
        ) : session ? (
          <Restaurant
            name="ChaCha Restaurant"
            company="chachaab"
            companyDomain="https://chacharestaurant.vercel.app"
            categories={[
              { value: "breakfast", label: "Breakfast" },
              { value: "dessert", label: "Dessert" },
              { value: "lunch", label: "Lunch" },
              { value: "dinner", label: "Dinner" },
              { value: "special", label: "Special" },
              { value: "drinks", label: "Drinks" },
            ]}
          />
        ) : null}
        {/* {!clientData.some((client) => client.email.includes(activeUser)) && ( */}
        {/* 
        {session ? (
          <p className="pt-40 text-center text-2xl">
            There is no available data for you
          </p>
        ) : null}
          */}
      </div>
    </>
  );
}
