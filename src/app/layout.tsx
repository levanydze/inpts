import "./globals.css";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import SessionProvider from "./SessionProvider";
import Header from "../../components/Header";
import NoData from "../../components/NoData";
import LowerFoot from "../../components/LowerFoot";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {!session ? (
            <>
              <Header />
              <NoData />
            </>
          ) : (
            <>
              <Header loggedIn />
              {children}
            </>
          )}
        </SessionProvider>
        <LowerFoot />
      </body>
    </html>
  );
}
