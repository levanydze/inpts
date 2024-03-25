import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <button className="button1" onClick={() => signIn("google")}>
      Login
    </button>
  );
}
