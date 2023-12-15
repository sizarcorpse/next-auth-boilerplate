import { cn } from "@/libs/utils";
import {
  Bot as Discord,
  Facebook,
  Github,
  Instagram,
  KeyRound,
  Linkedin,
  LucideIcon,
  Mail,
  Twitter,
  Type,
  User,
} from "lucide-react";
import React from "react";
import { Input, InputProps } from "./input";

interface InputWithIconProps extends InputProps {
  icon?: string;
  iconClassName?: string;
}

const IconList = {
  User: User as LucideIcon,
  Type: Type as LucideIcon,
  Mail: Mail as LucideIcon,
  KeyRound: KeyRound as LucideIcon,
  Github: Github as LucideIcon,
  Linkedin: Linkedin as LucideIcon,
  Twitter: Twitter as LucideIcon,
  Instagram: Instagram as LucideIcon,
  Facebook: Facebook as LucideIcon,
  Discord: Discord as LucideIcon,
};

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ icon, className, iconClassName, ...props }, ref) => {
    const DynamicIcon = IconList[icon as keyof typeof IconList];

    return (
      <div className="relative">
        <Input
          {...props}
          ref={ref}
          className={cn(`${icon && "pl-10"}`, className)}
        />
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <DynamicIcon
              className={cn(
                `w-4 h-4 text-primary-foreground/60`,
                iconClassName
              )}
            />
          </div>
        )}
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
