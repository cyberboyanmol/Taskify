import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full  p-4  shadow-sm bg-slate-100 flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex  items-center w-full justify-between ">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button variant={"ghost"} size={"sm"}>
            Privacy Policy
          </Button>
          <Button size={"sm"} variant={"ghost"}>
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  );
};
