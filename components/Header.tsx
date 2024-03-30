"use client";
import { useSession } from "next-auth/react";
import LogOut from "./LogOut";
import Login from "./Login";
import Image from "next/image";
import styles from "./Header.module.css";

interface HeaderProps {
  loggedIn?: boolean;
}

export default function Header({ loggedIn }: HeaderProps) {
  const { data: session } = useSession();

  return (
    <div className={styles.headerWrapper}>
      {loggedIn ? (
        <div className="button2 flex">
          {session ? (
            <Image
              className="profileImage"
              src={session.user?.image ?? ""}
              height={100}
              width={100}
              alt={session.user ? session.user.name! : "user"}
            />
          ) : null}
          <p className="pl-2">{session?.user?.email}</p>
        </div>
      ) : (
        <p className="button2">You are not logged in</p>
      )}
      {loggedIn ? <LogOut /> : <Login />}
    </div>
  );
}
