import { getUserServerSession } from "@/actions";
import { prisma } from "@/libs/prisma";

export default async function getCurrentUser() {
  try {
    const session = await getUserServerSession();

    if (!session) {
      return null;
    }

    if (!session?.user?.permissions?.includes("read:user")) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      include: {
        Role: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error: any) {
    return null;
  }
}
