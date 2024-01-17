"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

const LoginWithGithub = () => {
  return (
    <Button
      variant="outline"
      className="flex items-center h-12 justify-center gap-2 w-full border-none bg-primary-foreground/5 text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
      onClick={() =>
        signIn("github", {
          callbackUrl: "/",
        })
      }
    >
      <Github className="w-5 w-h" />
      <span className="font-light text-sm">Login with GitHub</span>
    </Button>
  );
};

export default LoginWithGithub;
