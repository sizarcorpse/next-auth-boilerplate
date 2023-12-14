import {
  Bot as Discord,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface ProfileCardSocialProps {
  twitter?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
  github?: string | null;
  instagram?: string | null;
  discord?: string | null;
}

interface SocialItemProps {
  icon: JSX.Element;
  url: string;
}

const SocialItem: FC<SocialItemProps> = ({ icon, url }) => {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url.startsWith("www.") ? "" : "www."}${url}`;
  }

  return (
    <Link
      href={url}
      target="_blank"
      className="flex flex-row items-center justify-center text-base text-primary bg-primary/5 p-2 rounded-full hover:bg-primary hover:text-warning transition-colors"
    >
      {icon}
    </Link>
  );
};

const ProfileCardSocial: FC<ProfileCardSocialProps> = ({
  discord,
  facebook,
  github,
  instagram,
  linkedin,
  twitter,
}) => {
  if (!discord && !facebook && !github && !instagram && !linkedin && !twitter)
    return null;

  const iconSizeClass = "w-[18px] h-[18px]";
  return (
    <div className="flex flex-row item-start justify-start gap-2">
      {twitter && (
        <SocialItem
          url={twitter}
          icon={<Twitter strokeWidth={1.5} className={iconSizeClass} />}
        />
      )}
      {facebook && (
        <SocialItem
          url={facebook}
          icon={<Facebook strokeWidth={1.5} className={iconSizeClass} />}
        />
      )}
      {instagram && (
        <SocialItem
          url={instagram}
          icon={<Instagram strokeWidth={1.5} className={iconSizeClass} />}
        />
      )}
      {linkedin && (
        <SocialItem
          url={linkedin}
          icon={<Linkedin strokeWidth={1.5} className={iconSizeClass} />}
        />
      )}
      {github && (
        <SocialItem
          url={github}
          icon={<Github strokeWidth={1.5} className={iconSizeClass} />}
        />
      )}
      {discord && (
        <SocialItem
          url={discord}
          icon={<Discord strokeWidth={1.5} className={iconSizeClass} />}
        />
      )}
    </div>
  );
};

export default ProfileCardSocial;
