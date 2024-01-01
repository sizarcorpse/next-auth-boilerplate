import { Profile, Role, User } from "@prisma/client";
import { FC } from "react";

import {
  ProfileCardButton,
  ProfileCardContact,
  ProfileCardInfo,
  ProfileCardSocial,
} from "@/components/user/";

interface Ux extends User {
  Role: Role;
}

interface ProfileCardProps {
  profile: Profile;
  user: Ux;
}

const ProfileHeader: FC<{ headline: string | null }> = ({ headline }) => {
  return <p className="text-base text-primary text-justify">{headline}</p>;
};

const ProfileCard: FC<ProfileCardProps> = ({ profile, user }) => {
  return (
    <div className="space-y-6 md:space-y-12">
      <div className="space-y-4">
        <ProfileCardInfo
          name={user?.name}
          username={user?.username}
          email={user?.email}
          image={user?.image}
          gender={profile?.gender}
          role={user?.Role?.name}
        />
        <ProfileHeader headline={profile?.headline} />
        <ProfileCardContact
          designation={profile?.designation}
          company={profile?.company}
          location={profile?.location}
          website={profile?.website}
          publicEmail={profile?.publicEmail}
          publicPhone={profile?.publicPhone}
        />
        <ProfileCardSocial
          twitter={profile?.twitter}
          facebook={profile?.facebook}
          linkedin={profile?.linkedin}
          github={profile?.github}
          instagram={profile?.instagram}
          discord={profile?.discord}
        />
      </div>
      <div>
        <ProfileCardButton />
      </div>
    </div>
  );
};

export default ProfileCard;
