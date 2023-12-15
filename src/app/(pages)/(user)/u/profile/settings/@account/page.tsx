import { getCurrentUser } from "@/actions";
import { UserAccountSettingForm } from "@/components/user/";
import { User } from "@prisma/client";

const UserAccountSettingPage = async () => {
  const user = (await getCurrentUser()) as User;
  return (
    <div>
      <UserAccountSettingForm userData={user} />
    </div>
  );
};

export default UserAccountSettingPage;
