import type { Metadata } from "next";
import { merienda } from "@/app/ui/fonts";
import {Navbar} from "@/app/ui/navigation";
import "./globals.css";
import ClientSessionProvider from "@/app/lib/client-session";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Fate's Gambit",
  description: "Become the Weaver of Destiny!",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${merienda.className} antialiased bg-stone-300 text-gray-900`}
      >
        <ClientSessionProvider session={session}>
          <div className="flex flex-col h-screen">
            <Navbar />
            <div className="h-9/10 w-full p-2 flex flex-col">
              {children}
            </div>
          </div>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
