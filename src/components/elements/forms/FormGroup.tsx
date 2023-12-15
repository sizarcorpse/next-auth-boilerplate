import { cn } from "@/libs/utils";
import {
  Building2,
  Fingerprint,
  Info,
  LucideIcon,
  Share2,
  User,
} from "lucide-react";

const icons = {
  Building2: Building2,
  Fingerprint: Fingerprint,
  Info: User,
  Share2: Share2,
};

const FormGroup = ({
  children,
  icon,
  title,
  subtitle,
  column = 1,
  className,
}: {
  children: React.ReactNode;
  title: string;
  icon?: string;
  subtitle?: string;
  className?: string;
  column?: number;
}) => {
  const Icon = icons[icon as keyof typeof icons] || (Info as LucideIcon);
  return (
    <div className={cn(`flex flex-col gap-4`, className)}>
      <div>
        <div className="flex flex-row items-center justify-start gap-2">
          <Icon className="w-4 h-4" />
          <span className="text-sm font-semibold">{title}</span>
        </div>
        {subtitle && <span className="text-xs font-light">{subtitle}</span>}
      </div>
      <div
        className={`grid gap-4 ${
          column === 2 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
        } `}
      >
        {children}
      </div>
    </div>
  );
};

export default FormGroup;
