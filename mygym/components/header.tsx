import { History, LogOut } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div className="flex items-center justify-between p-6">
      {/* App Icon */}
      <div className="flex items-center gap-3">
        <div className="bg-amber-400 h-12 w-12">{/* <img></img>  */}</div>
        {/* App name */}
        <div>
          <h1 className="text-2xl font-semibold">
            MY<span className="text-yellow-400">GYM</span>
          </h1>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button variant="ghost" size="icon">
          <History />
        </Button>
        <Button variant="ghost" size="icon">
          <LogOut />
        </Button>
      </div>
    </div>
  );
}
