import { prisma } from "@/libs/prisma";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider, { GithubProfile } from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GitHubProvider({
      authorization: {
        params: {
          scope: "read:user user:email",
        },
      },
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (
          !user ||
          !(await compare(credentials.password, user.password as string))
        ) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          uxdi: "🚀",
        };
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: () => {
      return true;
    },

    session: async ({ token, session }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.username = token.username;
        session.user.role = token.role;
        session.user.permissions = token.permissions;
      }
      return session;
    },
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
        };
      }

      const u = await prisma.user.findUnique({
        where: {
          email: token.email as string,
        },
        include: {
          profile: true,
          Role: {
            include: {
              permissions: true,
            },
          },
        },
      });

      if (!u) {
        token.id = user.id;
        return token;
      }

      const operations = [];

      if (!u.username || u.username === null) {
        operations.push(
          prisma.user.update({
            where: {
              id: u.id,
            },
            data: {
              username: u.email?.split("@")[0],
            },
          })
        );
      }

      if (!u.profile || u.profile === null) {
        operations.push(
          prisma.profile.create({
            data: {
              user: {
                connect: {
                  id: u.id,
                },
              },
            },
          })
        );
      }

      if (!u.Role || u.Role === null) {
        operations.push(
          prisma.user.update({
            data: {
              Role: {
                connect: {
                  name: "USER",
                },
              },
            },
            where: {
              id: u.id,
            },
          })
        );
      }

      await prisma.$transaction(operations);

      return {
        id: u.id,
        name: u.name,
        email: u.email,
        image: u.image,
        username: u.username,
        role: u.Role?.name,
        permissions: u.Role?.permissions.map((p) => p.name),
      };
    },
  },
};
