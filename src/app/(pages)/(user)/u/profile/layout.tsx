import { getUser, getUserProfile } from "@/actions";
import { ProfileCard } from "@/components/user";
import { Profile, Role, User } from "@prisma/client";

export const dynamic = "force-dynamic";

interface UserWithRole extends User {
  Role: Role;
}

// async function getUserData() {
//   const token = await getUserToken();
//   try {
//     const response = await fetch(`${process.env.NEXT_API_URL}/user`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: token,
//       },
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     return null;
//   }
// }

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = ((await getUser()) as UserWithRole) || null;
  const profile = ((await getUserProfile()) as Profile) || null;

  return (
    <div className="px-2 sm:px-6 mx-auto max-w-screen-2xl">
      <div className="grid grid-cols-12 gap-4 items-start lg:gap-6 xl:gap-8">
        <div className="p-4 bg-muted rounded-lg col-span-12 md:col-span-5 lg:col-span-4 xl:col-span-3">
          <ProfileCard profile={profile} user={user} />
        </div>
        <div className="min-h-screen p-4 bg-muted rounded-lg col-span-12 md:col-span-7 lg:col-span-8 xl:col-span-9">
          {children}
        </div>
      </div>
    </div>
  );
}
