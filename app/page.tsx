import Image from "next/image";
import { brush } from "@/app/ui/fonts";
import WelcomeOptions from "@/app/ui/welcome";

export default function Home() {
  return (
    <div className="bg-slate-100 h-full">
      <main className="flex h-full w-full">
        <div className={`h-full w-full ${brush.className} flex flex-col place-content-center`}>
          <div className="text-5xl text-center">Welcome, Weaver of Destiny, to</div>
          <div className="text-9xl text-center">Fate's Gambit</div>
          <WelcomeOptions />
        </div>
      </main>
    </div>
  );
}
