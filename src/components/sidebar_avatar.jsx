import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function AvatarDemo() {
  return (
    <div className="flex gap-3">
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback>MV</AvatarFallback>
      </Avatar>
      <div className="text-start flex flex-col">
        <snap className="text-sm font-medium">Mate Varadi</snap>
        <snap className="text-xs text-muted-foreground">New Member</snap>
      </div>
    </div>
  );
}
