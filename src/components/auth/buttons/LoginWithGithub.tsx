"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

const LoginWithGithub = () => {
  return (
    <Button
      variant="secondary"
      className="flex items-center justify-center gap-2 w-full"
      onClick={() =>
        signIn("github", {
          callbackUrl: "/",
        })
      }
    >
      <Github className="w-5 w-h" />
      <span>Continue with GitHub</span>
    </Button>
  );
};

export default LoginWithGithub;
