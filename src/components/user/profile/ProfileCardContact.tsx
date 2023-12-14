import {
  AtSign,
  Award,
  Building2,
  Link as LinkIcon,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface ProfileCardContactProps {
  designation?: string | null;
  company?: string | null;
  location?: string | null;
  website?: string | null;
  publicEmail?: string | null;
  publicPhone?: string | null;
}

interface ContactItemProps {
  icon: JSX.Element;
  text: string;
  type: "email" | "website" | "phone" | "default";
}

const ContactItem: FC<ContactItemProps> = ({ icon, text, type }) => {
  let href = text;
  if (type === "email") {
    href = `mailto:${text}`;
  } else if (type === "phone") {
    href = `tel:${text}`;
  }

  const isLink = type === "email" || type === "phone" || type === "website";

  return (
    <div className="group flex flex-row items-center justify-start gap-2 text-base text-primary">
      <span className="shrink-0 group-hover:text-warning transition-colors">
        {icon}
      </span>
      {isLink ? (
        <Link href={href} target={type === "website" ? "_blank" : undefined}>
          {text}
        </Link>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

const ProfileCardContact: FC<ProfileCardContactProps> = ({
  designation,
  company,
  location,
  website,
  publicEmail,
  publicPhone,
}) => {
  if (
    !designation &&
    !company &&
    !location &&
    !website &&
    !publicEmail &&
    !publicPhone
  )
    return null;

  const iconSizeClass = "w-[18px] h-[18px]";

  return (
    <div className="flex flex-col items-start justify-start gap-2">
      {company && (
        <ContactItem
          icon={<Building2 className={iconSizeClass} strokeWidth={1.5} />}
          text={company}
          type="default"
        />
      )}
      {designation && (
        <ContactItem
          icon={<Award className={iconSizeClass} strokeWidth={1.5} />}
          text={designation}
          type="default"
        />
      )}
      {location && (
        <ContactItem
          icon={<MapPin className={iconSizeClass} strokeWidth={1.5} />}
          text={location}
          type="default"
        />
      )}
      {publicEmail && (
        <ContactItem
          icon={<AtSign className={iconSizeClass} strokeWidth={1.5} />}
          text={publicEmail}
          type="email"
        />
      )}
      {publicPhone && (
        <ContactItem
          icon={<Phone className={iconSizeClass} strokeWidth={1.5} />}
          text={publicPhone}
          type="phone"
        />
      )}
      {website && (
        <ContactItem
          icon={<LinkIcon className={iconSizeClass} strokeWidth={1.5} />}
          text={website}
          type="website"
        />
      )}
    </div>
  );
};

export default ProfileCardContact;
