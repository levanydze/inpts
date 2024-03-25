import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button className="button1" onClick={() => signOut()}>
      Logout
    </button>
  );
}
