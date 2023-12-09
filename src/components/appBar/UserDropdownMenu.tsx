"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Globe2,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Settings,
  ShieldCheck,
  User,
  UserCog,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const MENU_PRIMARY = [
  {
    label: "Profile",
    icon: User,
    href: "/u/profile",
  },
  {
    label: "Account Settings",
    icon: UserCog,
    href: "/u/account-settings",
  },
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
];

const MENU_SECONDARY = [
  {
    label: "Help",
    icon: Lightbulb,
    href: "/help",
  },
  {
    label: "Language",
    icon: Globe2,
    href: "/language",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    label: "Privacy Policy",
    icon: ShieldCheck,
    href: "/privacy",
  },
];

const SingOutBox = () => {
  return (
    <DropdownMenuItem>
      <Button
        title="Sign out"
        onClick={() => signOut()}
        className="text-sm font-light h-8 text-primary-foreground text-center flex flex-row items-center justify-between rounded-md cursor-pointer px-4 py-2 gap-4 bg-primary/90 w-full hover:bg-destructive"
      >
        Sign me out
        <LogOut size="1rem" />
      </Button>
    </DropdownMenuItem>
  );
};

const NavigationMenu = ({ items }: any) => {
  return (
    <>
      {items.map((item: any, index: any) => {
        const Icon = item.icon;
        return (
          <DropdownMenuItem key={index} className="group hover:bg-muted">
            <Link href={item.href} className="flex items-center gap-3 w-full">
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-sm">{item.label}</span>
            </Link>
          </DropdownMenuItem>
        );
      })}
    </>
  );
};

const ProfileMiniCard = ({ user }: any) => {
  const { name, image, email } = user || {};
  return (
    <div className="w-full flex flex-row items-center justify-between gap-3">
      <div className="basis-16">
        <Image
          src={image || "/assets/images/default-avatar.jpeg"}
          alt="avatar"
          width={64}
          height={64}
          className="rounded-full"
        />
      </div>
      <div className="basis-44">
        <span className="text-base font-medium text-primary-foreground line-clamp-1">
          {name}
        </span>
        <p className="text-sm font-normal text-primary-foreground">{email}</p>
      </div>
    </div>
  );
};

const UserDropdownMenu = ({ user }: any) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Image
            src={user?.image || "/assets/images/default-avatar.jpeg"}
            alt="avatar"
            width={36}
            height={36}
            className="rounded-full"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end">
          <DropdownMenuItem className="h-auto bg-primary pointer-events-none">
            <ProfileMiniCard user={user} />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <NavigationMenu items={MENU_PRIMARY} />
          <DropdownMenuSeparator />
          <NavigationMenu items={MENU_SECONDARY} />
          <DropdownMenuSeparator />
          <SingOutBox />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserDropdownMenu;
