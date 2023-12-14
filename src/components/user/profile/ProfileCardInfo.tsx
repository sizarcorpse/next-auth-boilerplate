import { ProfilePhoto } from "@/components/user/";
import { cn } from "@/libs/utils";
import { Gender } from "@prisma/client";
import { FC } from "react";
import { RiGenderlessLine, RiMenLine, RiWomenLine } from "react-icons/ri";

interface ProfileCardInfoProps {
  name: string | null;
  username: string | null;
  email: string | null;
  image?: string | null;
  gender?: string | null;
  role?: string | null;
}

const RoleChip: React.FC<{ role: string }> = ({ role }) => {
  return (
    <span
      className={cn(
        `text-primary-foreground bg-primary text-sm px-4 py-1 rounded-3xl`,
        role === "ADMIN" && `bg-destructive text-destructive-foreground`
      )}
    >
      {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
    </span>
  );
};

const UserGender: React.FC<{
  gender: Gender;
}> = ({ gender }) => {
  return (
    <div className="flex flex-row items-center justify-start gap-2">
      {gender === "MALE" && <RiMenLine size="1rem" />}
      {gender === "FEMALE" && <RiWomenLine size="1rem" />}
      {["OTHER", "NOT_SELECTED"]!.includes(gender) && (
        <RiGenderlessLine size="1rem" />
      )}
    </div>
  );
};

const ProfileCardInfo: FC<ProfileCardInfoProps> = ({
  name,
  username,
  email,
  image,
  gender,
  role,
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-4 sm:gap-8 md:flex-col md:items-start">
      <ProfilePhoto image={image} />
      <div className="space-y-2">
        <div>{role && <RoleChip role={role} />}</div>
        <div className="flex flex-col items-start gap-0">
          <div className="flex items-center justify-start gap-2">
            <span className="text-base sm:text-xl font-bold text-primary">
              {name}
            </span>
            <UserGender gender={gender as keyof typeof Gender} />
          </div>
          <span className="text-sm font-medium text-primary/80 mb-1">
            @{username}
          </span>
          <span className="text-base text-primary/80">{email}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardInfo;
