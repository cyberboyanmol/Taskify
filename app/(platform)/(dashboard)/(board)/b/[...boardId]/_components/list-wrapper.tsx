import { forwardRef } from "react";

interface ListWrapperProps {
  children: React.ReactNode;
}

export const ListWrapper = forwardRef<HTMLOListElement, ListWrapperProps>(
  ({ children }, ref) => {
    return (
      <li className="shrink-0 h-full w-[272px] select-none">{children}</li>
    );
  }
);

ListWrapper.displayName = "ListWrapper";
