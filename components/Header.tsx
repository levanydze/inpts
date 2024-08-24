"use client";
import { useSession } from "next-auth/react";
import LogOut from "./LogOut";
import Login from "./Login";
import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
const logo =
  "https://github.com/levanydze/SUP/blob/main/VkLeo/assets/LevaniDze..png?raw=true";

interface HeaderProps {
  loggedIn?: boolean;
}

export default function Header({ loggedIn }: HeaderProps) {
  const { data: session } = useSession();

  return (
    <div className={styles.headerWrapper}>
      <Link href="https://levanidze.com" target="_blank">
        <Image
          className={styles.logo}
          src={logo}
          width={150}
          height={50}
          alt=""
        />
      </Link>
      <div className={styles.authDiv}>
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
          <div>
            <p className="button2">You are not logged in</p>
          </div>
        )}
        {loggedIn ? <LogOut /> : <Login />}
      </div>
    </div>
  );
}
