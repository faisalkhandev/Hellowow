import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuArrow,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./userAvatar";
import { DeleteDialog } from "./common/DeleteDialog";
import { Button } from "./ui/button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const ProfileMenu = async () => {
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <UserAvatar />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 space-y-2 ">
        <DropdownMenuItem className="py-2">
          <span>{session?.user.email}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-2">
          <span>Content Machine</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span>Billing Info</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/user/setting">
          <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span>Favourite Tools</span>
        </DropdownMenuItem>
        <div className="flex-col gap-1">
          <Button variant="ghost" className="w-full">
            Support us
          </Button>
          <DropdownMenuSeparator />
          <DeleteDialog />
        </div>
        <DropdownMenuArrow className="fill-white absolute bottom-full left-1/2 transform -translate-x-1/2" />{" "}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
