"use client";

import Image from "next/image";

interface ProfilePhotoProps {
  image?: string | null;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ image }) => {
  return (
    <figure>
      <Image
        src={image || "/assets/images/default-avatar.jpeg"}
        alt="Profile Photo"
        width={296}
        height={296}
        className="rounded-full object-cover w-24 sm:w-32 md:w-72"
      />
    </figure>
  );
};

export default ProfilePhoto;
