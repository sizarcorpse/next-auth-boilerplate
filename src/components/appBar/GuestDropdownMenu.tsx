import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Globe2,
  Lightbulb,
  Settings,
  ShieldCheck,
  UserCheck,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

const MENU_PRIMARY = [
  {
    label: "Sign In",
    icon: UserCheck,
    href: "/signin",
    disabled: false,
  },
  {
    label: "Sign Up",
    icon: UserPlus,
    href: "/signup",
    disabled: false,
  },
];

const MENU_SECONDARY = [
  {
    label: "Help",
    icon: Lightbulb,
    href: "/help",
    disabled: true,
  },
  {
    label: "Language",
    icon: Globe2,
    href: "/language",
    disabled: true,
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    disabled: true,
  },
  {
    label: "Privacy Policy",
    icon: ShieldCheck,
    href: "/privacy",
    disabled: true,
  },
];

const NavigationMenu = ({ items }: any) => {
  return (
    <>
      {items.map((item: any, index: any) => {
        const Icon = item.icon;
        return (
          <DropdownMenuItem
            key={index}
            className="group hover:bg-muted"
            disabled={item.disabled}
          >
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

const GuestDropdownMenu = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-auto px-8 py-3 text-sm">
            <span>Explore Now</span>
            <ChevronDown className="w-h h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end">
          <NavigationMenu items={MENU_PRIMARY} />
          <DropdownMenuSeparator />
          <NavigationMenu items={MENU_SECONDARY} />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default GuestDropdownMenu;
