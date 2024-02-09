import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { Toaster } from "sonner";
const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <Toaster expand={true} richColors />
      {children}
    </ClerkProvider>
  );
};

export default PlatformLayout;
