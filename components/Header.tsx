"use client";
import { useSession } from "next-auth/react";
import LogOut from "./LogOut";
import Login from "./Login";
import Image from "next/image";

interface HeaderProps {
  loggedIn?: boolean;
}

export default function Header({ loggedIn }: HeaderProps) {
  const session = useSession();

  return (
    <div className="flex justify-between z-50 relative bg-black  w-full p-4">
      {loggedIn ? (
        <div className="button2 flex ">
          <Image
            className="profileImage"
            src={session?.data?.user?.image!}
            height={100}
            width={100}
            alt={session?.data?.user?.name!}
          />
          <p className="pl-2">
            {session?.data?.user?.email} Levanydze@gmail.com
          </p>
        </div>
      ) : (
        <p className="button2">Your are not logged in</p>
      )}
      {loggedIn ? <LogOut /> : <Login />}
    </div>
  );
}