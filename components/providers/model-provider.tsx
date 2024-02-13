"use client";
import { useEffect, useState } from "react";
import { CardModal } from "../modal/card-modal";
import { SubscriptionModal } from "../modal/subscription-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CardModal />
      <SubscriptionModal />
    </>
  );
};
