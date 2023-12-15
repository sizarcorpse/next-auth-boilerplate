"use server";

import { getUserServerSession } from "@/actions";
import { prisma } from "@/libs/prisma";
import { UserValidation, UserValidationRequest } from "@/validators/user";
import { Prisma } from "@prisma/client";
import { compare, hash } from "bcryptjs";

const updateUser = async (payload: UserValidationRequest) => {
  console.log("|🚀|action:`updateUserAccount`");
  try {
    const session = await getUserServerSession();

    if (!session?.user?.email) {
      throw new Error("No user id found");
    }

    const cu = session?.user;

    if (!cu.permissions?.includes("write:user")) {
      throw new Error("Permission denied");
    }

    const v = UserValidation.safeParse(payload);
    if (!v.success) {
      throw new Error("Invalid user data");
    }

    const { name, email, username, currentPassword, newPassword } = v.data;
    const data: Prisma.UserUpdateInput = {};

    if (name != cu.name) {
      data.name = name;
    }

    if (email != cu.email || username != cu.username) {
      const un = cu.username === username ? undefined : username;
      const em = cu.email === email ? undefined : email;

      const IsUserExists = await prisma.user.findFirst({
        where: {
          OR: [
            {
              username: un,
            },
            {
              email: em,
            },
          ],
        },
      });
      if (IsUserExists) {
        throw new Error("Username or email already exists");
      } else {
        data["username"] = un;
        data["email"] = em;
      }
    }

    if (currentPassword && newPassword) {
      const user = await prisma.user.findUnique({
        where: {
          id: cu.id,
        },
        select: {
          password: true,
          accounts: true,
        },
      });

      if (!user) {
        throw new Error("Password update failed");
      }

      const isPasswordMatch = await compare(
        currentPassword,
        user?.password as string
      );

      if (!isPasswordMatch) {
        throw new Error("Current password is incorrect");
      }

      if (Object.keys(user.accounts).length > 0) {
        throw new Error(
          "Cannot update password when there are linked accounts"
        );
      }

      const hashedPassword = await hash(newPassword, 12);
      data["password"] = hashedPassword;
    }

    const user = await prisma.user.update({
      where: {
        email: session?.user?.email,
      },
      data: data,
    });

    if (!user) {
      throw new Error("Account update failed");
    }

    return { status: "ok", data: user };
  } catch (error: any) {
    return { status: "error", message: error.message };
  }
};

export default updateUser;
