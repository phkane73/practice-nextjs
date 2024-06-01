import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import React from "react";
import { Toaster } from "../ui/sonner";
const inter = Inter({ subsets: ["latin"] });

interface IDefaultLayoutProps {
  children: React.ReactNode;
}

export const DefaultLayout = ({ children }: IDefaultLayoutProps) => {
  return (
    <>
      <main
        className={cn("flex flex-col gap-2 p-10 max-h-screen", inter.className)}
      >
        {children}
      </main>
      <Toaster richColors></Toaster>
    </>
  );
};
