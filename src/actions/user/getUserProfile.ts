import { getUserServerSession } from "@/actions";
import { prisma } from "@/libs/prisma";
import { th } from "date-fns/locale";

export default async function getUserProfile() {
  try {
    const session = await getUserServerSession();
    if (!session) {
      return null;
    }

    if (!session?.user?.permissions?.includes("read:profile")) {
      return null;
    }

    const profile = await prisma.profile.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!profile) {
      return null;
    }

    return profile;
  } catch (error: any) {
    return null;
  }
}
