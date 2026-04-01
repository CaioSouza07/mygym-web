import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export default function AddButton() {
  return (
    <div className="fixed bottom-0 right-0 p-6 rounded-full ">
      <Button variant="default" size="icon" className="h-14 w-14 rounded-full">
        <Plus className="size-6 text-black"/>
      </Button>
    </div>
  );
}
