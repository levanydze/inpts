"use client";
import { useSession } from "next-auth/react";
import Post from "./post/Post";

export default function Home() {
  const session = useSession();
  const activeUser = session?.data?.user?.email ?? "";

  //list of companies
  const chachaab = ["artoflevanidze@gmail.com", "levanydze@gmail.com"];

  return (
    <div>
      {chachaab.includes(activeUser) ? (
        <Post />
      ) : (
        <h1 className="pt-40 text-center text-2xl">
          There is no available data for you
        </h1>
      )}
    </div>
  );
}
