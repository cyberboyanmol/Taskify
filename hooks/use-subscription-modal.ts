import { create } from "zustand";

type SubscriptionStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSubscription = create<SubscriptionStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
