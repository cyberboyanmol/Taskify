import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
const textfont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const headingfont = localFont({ src: "../../public/fonts/font.woff2" });
const LandingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={cn(
          "flex items-center justify-center flex-col",
          headingfont.className
        )}
      >
        <div className="uppercase mb-4 flex items-center border  shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full ">
          <Medal className="h-6 w-6 mr-2" />
          No 1 task management
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6 ">
          Taskify helps team move
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r  from-fuchsia-600 to-pink-600 text-white px-4 rounded-md pb-4 w-fit">
          work forward.
        </div>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl  text-center mx-auto",
          textfont.className
        )}
      >
        Taskify revolutionizes teamwork, from boardroom to virtual workspace.
        Elevate collaboration, streamline projects, and boost productivity
        seamlessly. Your unique workflow, supercharged. Welcome to a new era of
        efficiency.
      </div>
      <Button className="mt-6" size={"lg"} asChild>
        <Link href={"/sign-up"}>Get Taskify for free</Link>
      </Button>
    </div>
  );
};

export default LandingPage;
