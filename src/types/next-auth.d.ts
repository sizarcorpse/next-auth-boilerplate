import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    username?: string | null;
    image?: string | null;
    role?: string | null;
    permissions?: string[] | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      image?: string | null;
      username?: string | null;
      role?: string | null;
      permissions?: string[] | null;
    };
  }
}
