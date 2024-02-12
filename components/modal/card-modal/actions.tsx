import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { useCardModalStore } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface ActionsProps {
  data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModalStore();

  const { execute: executeDeleteCard, isLoading: isLoadingDeleteCard } =
    useAction(deleteCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" deleted`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

  const onDeleteCard = () => {
    const boardId = params.boardId[0] as string;
    executeDeleteCard({
      id: data.id,
      boardId,
    });
  };
  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        variant={"gray"}
        className="w-full rounded justify-start items-center"
        size={"sm"}
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        onClick={onDeleteCard}
        disabled={isLoadingDeleteCard}
        variant={"gray"}
        className="w-full  rounded   justify-start items-center"
        size={"sm"}
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
