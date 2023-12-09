import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth/next";

export default async function getUserServerSession() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    return session;
  } catch (error: any) {
    return null;
  }
}
