import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Competition} from "@/lib/schema/zod";
import {EntryForm} from "@/app/(app)/competitions/EntryForm";

type Props = {
  competition: Competition
}

export const EntrySheet = ({ competition }: Props) => {
  return (
    <Sheet>
      <SheetTrigger>Entry</SheetTrigger>
      <SheetContent hideClose className="max-w-full w-full sm:w-full sm:max-w-full">
        <SheetHeader>
          <SheetTitle>Entry &quot;{competition.name}&quot;</SheetTitle>
        </SheetHeader>

        <EntryForm competition={competition} />
      </SheetContent>
    </Sheet>
  )
}
