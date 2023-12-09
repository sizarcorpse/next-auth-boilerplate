import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const permissions = [
    "read:user",
    "write:user",
    "delete:user",
    "read:profile",
    "write:profile",
    "delete:profile",
    "read:role",
    "write:role",
    "delete:role",
    "read:permission",
    "write:permission",
    "delete:permission",
  ];

  const roles = [
    { name: "GUEST", permissions: ["read:user", "read:profile"] },
    {
      name: "USER",
      permissions: [
        "read:user",
        "write:user",
        "delete:user",
        "read:profile",
        "write:profile",
        "delete:profile",
      ],
    },
    { name: "ADMIN", permissions: permissions },
  ];

  for (const permissionName of permissions) {
    await prisma.permission.upsert({
      where: { name: permissionName },
      update: {},
      create: { name: permissionName },
    });
  }

  for (const role of roles) {
    const rolePermissions = await prisma.permission.findMany({
      where: {
        name: {
          in: role.permissions,
        },
      },
    });

    await prisma.role.upsert({
      where: { name: role.name },
      update: {
        permissions: {
          set: rolePermissions.map((permission) => ({
            permissionId: permission.permissionId,
          })),
        },
      },
      create: {
        name: role.name,
        permissions: {
          connect: rolePermissions.map((permission) => ({
            permissionId: permission.permissionId,
          })),
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
