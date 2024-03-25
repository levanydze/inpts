"use client";
import { useSession } from "next-auth/react";
import Post from "./post/Post";

export default function Home() {
  const session = useSession();
  return (
    <>
      <div>
        {session?.data?.user?.email === "artoflevanidze@gmail.com" ? (
          <Post />
        ) : session?.data?.user?.email === "levanydze@gmail.com" ? (
          <h1 className="text-white">sss</h1>
        ) : (
          <h1 className="pt-40">There is no available data for you</h1>
        )}
      </div>
    </>
  );
}
