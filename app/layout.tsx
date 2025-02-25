import type { Metadata } from "next";
import { merienda } from "@/app/ui/fonts";
import {Navbar} from "@/app/ui/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fate's Gambit",
  description: "Become the Weaver of Destiny!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${merienda.className} antialiased bg-stone-300`}
      >
        <div className="flex flex-col h-screen">
          <Navbar />
          <div className="h-4/5 w-full p-2 flex flex-col">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
