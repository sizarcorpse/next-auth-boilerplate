import { getUserProfile } from "@/actions";
import { ProfileUpdateForm } from "@/components/user";
import { Profile } from "@prisma/client";

export const dynamic = "force-dynamic";

// if use api route:
// async function getUserProfileData() {
//   const token = await getUserToken();
//   try {
//     const response = await fetch(`${process.env.NEXT_API_URL}/user/profile`, {
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

const UserProfileSettingPage = async () => {
  // const profileData = await getUserProfileData();
  const profile = (await getUserProfile()) as Profile | null;

  return (
    <div className="">
      <ProfileUpdateForm profileData={profile} />
    </div>
  );
};

export default UserProfileSettingPage;
