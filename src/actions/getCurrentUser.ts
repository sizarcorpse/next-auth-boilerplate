import { getUserServerSession } from "@/actions";
import { prisma } from "@/libs/prisma";

export default async function getCurrentUser() {
  try {
    const session = await getUserServerSession();

    if (!session) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
}
