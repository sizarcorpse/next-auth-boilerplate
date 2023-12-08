import { GuestDropdownMenu, UserDropdownMenu } from "@/components/appBar";

import { Coffee } from "lucide-react";
import Link from "next/link";
const Logo = () => {
  return (
    <div className="flex-shrink-0 flex items-center gap-2">
      <Link href="/">
        <Coffee
          className="w-7 h-7 text-gradient-to-r from-primary via-primary/80 to-primary hover:scale-110 transform transition-all duration-300"
          strokeWidth={1.75}
        />
      </Link>
      <Link
        href="https://sizar.io"
        target="_blank"
        className="text-primary text-base font-medium hover:underline"
      >
        sizar.io
      </Link>
    </div>
  );
};

const AppBar = ({ user }: { user: any }) => {
  return (
    <header className="h-16 sticky top-0 z-30">
      <div className="mx-auto md:px-8">
        <nav className="flex items-center justify-between p-4 sm:px-6 lg:px-8 xl:px-0">
          <Logo />
          {user ? <UserDropdownMenu /> : <GuestDropdownMenu />}
        </nav>
      </div>
    </header>
  );
};

export default AppBar;
