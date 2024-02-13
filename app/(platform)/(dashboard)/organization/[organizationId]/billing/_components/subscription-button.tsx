"use client";
import { stripeSubscription } from "@/actions/stripe-subscription";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useSubscription } from "@/hooks/use-subscription-modal";
import { toast } from "sonner";
import { boolean } from "zod";

export const SubscriptionButton = ({ isPro }: { isPro: boolean }) => {
  const subscription = useSubscription();

  const { execute, isLoading } = useAction(stripeSubscription, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onClick = () => {
    if (isPro) {
      execute({});
    } else {
      subscription.onOpen();
    }
  };

  return (
    <Button variant={"primary"} disabled={isLoading} onClick={onClick}>
      {isPro ? "Manage subscription" : "Upgrade to pro"}
    </Button>
  );
};
