"use client";

import { Button } from "@/components/ui/button";
import { Undo2, UserCog } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProfileCardButton = () => {
  const pathname = usePathname();

  const iconClasses = "w-5 h-5";
  const url = pathname === "/u/profile" ? "/u/profile/settings" : "/u/profile";
  const text = pathname === "/u/profile" ? "User Settings" : "Back to Profile";
  const Icon =
    pathname === "/u/profile" ? (
      <UserCog className={iconClasses} strokeWidth={1.75} />
    ) : (
      <Undo2 className={iconClasses} strokeWidth={1.75} />
    );

  return (
    <div>
      <Link href={`${url}`}>
        <Button className="flex flex-row items-center justify-center gap-2 text-sm">
          {Icon}
          <span>{text}</span>
        </Button>
      </Link>
    </div>
  );
};

export default ProfileCardButton;
