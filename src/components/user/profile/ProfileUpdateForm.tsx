"use client";

import {
  DateFormField,
  SelectFormField,
  SocialFormField,
  TextFormField,
  TextareaFormField,
} from "@/components/elements";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useUserProfileSwr } from "@/hooks/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gender, Profile, Pronouns } from "@prisma/client";
import { get } from "http";
import _ from "lodash";
import {
  Building2,
  Fingerprint,
  Info,
  LucideIcon,
  Share2,
  User,
} from "lucide-react";
import { revalidatePath, revalidateTag } from "next/cache";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

const genderOptions = ["MALE", "FEMALE", "OTHER", "NOT_SELECTED"] as const;
const pronounsOptions = [
  "HE_HIM",
  "SHE_HER",
  "THEY_THEM",
  "DONT_SPECIFY",
  "OTHER",
] as const;

const profileSchema = z.object({
  designation: z.string().min(3).max(50).optional(),
  company: z.string().min(3).max(50).optional(),
  website: z.string().url().optional(),
  location: z.string().min(3).max(50).optional(),
  publicEmail: z.string().email().optional(),
  publicPhone: z.string().min(3).max(50).optional(),
  gender: z.enum(genderOptions).optional(),
  pronouns: z.enum(pronounsOptions).optional(),
  headline: z.string().min(1).max(200).optional(),
  biography: z.object({}).optional(),
  dateOfBirth: z.date().optional(),
  linkedin: z.string().url().optional().optional(),
  github: z.string().url().optional(),
  twitter: z.string().url().optional(),
  facebook: z.string().url().optional(),
  instagram: z.string().url().optional(),
  discord: z.string().url().optional(),
});

const transformGenderOptions = genderOptions.map((option) => ({
  label:
    option.toLowerCase().charAt(0).toUpperCase() +
    option.toLowerCase().slice(1),
  value: option,
}));

const transformPronounsOptions = pronounsOptions.map((option) => ({
  label:
    option.toLowerCase().charAt(0).toUpperCase() +
    option.toLowerCase().slice(1),
  value: option,
}));

const FormGroup = ({
  children,
  icon,
  title,
  subtitle,
  column = 1,
}: {
  children: React.ReactNode;
  title: string;
  icon?: LucideIcon;
  subtitle?: string;
  className?: string;
  column?: number;
}) => {
  const Icon = icon || Info;
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex flex-row items-center justify-start gap-2">
          <Icon className="w-5 h-5" />
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

function getDefaultValue(value: any) {
  return value || undefined;
}

const ProfileUpdateForm = ({ profileData }: { profileData: any }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { profile: cv, mutateProfile } = useUserProfileSwr({
    initProfileData: profileData,
  });

  const profile = _.merge({}, profileData.data, cv);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      designation: getDefaultValue(profile?.designation),
      company: getDefaultValue(profile?.company),
      website: getDefaultValue(profile?.website),
      location: getDefaultValue(profile?.location),
      publicEmail: getDefaultValue(profile?.publicEmail),
      publicPhone: getDefaultValue(profile?.publicPhone),
      gender:
        profile?.gender === "NOT_SELECTED"
          ? undefined
          : (profile?.gender as keyof typeof Gender),
      pronouns:
        profile?.pronouns === "DONT_SPECIFY"
          ? undefined
          : (profile?.pronouns as keyof typeof Pronouns),
      headline: getDefaultValue(profile?.headline),
      biography: getDefaultValue(profile?.biography),
      dateOfBirth: getDefaultValue(profile?.dateOfBirth),
      linkedin: getDefaultValue(profile?.linkedin),
      github: getDefaultValue(profile?.github),
      twitter: getDefaultValue(profile?.twitter),
      facebook: getDefaultValue(profile?.facebook),
      instagram: getDefaultValue(profile?.instagram),
      discord: getDefaultValue(profile?.discord),
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  const handleUpdateProfile = async (values: z.infer<typeof profileSchema>) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        body: JSON.stringify(values),
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }
      toast.success(json.message);
      setIsLoading(false);
      mutateProfile(json, false);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          className="space-y-12"
        >
          {/* COMPANY */}
          <FormGroup
            title="Company Information"
            subtitle="Your company information will be visible to other users on your profile."
            icon={Building2}
            column={2}
          >
            <TextFormField
              form={form}
              name="designation"
              placeholder="Designation"
              error={errors.designation}
            />
            <TextFormField
              form={form}
              name="company"
              placeholder="Company"
              error={errors.company}
            />
          </FormGroup>

          {/* CONTACT INFORMATION */}
          <FormGroup
            title="Contact Information"
            subtitle="Your contact information will be visible to other users on your profile."
            icon={Fingerprint}
            column={2}
          >
            <TextFormField
              form={form}
              name="location"
              placeholder="Location"
              error={errors.location}
            />
            <TextFormField
              form={form}
              name="publicEmail"
              placeholder="Email"
              error={errors.publicEmail}
            />
            <TextFormField
              form={form}
              name="publicPhone"
              placeholder="Phone"
              error={errors.publicPhone}
            />
            <TextFormField
              form={form}
              name="website"
              placeholder="Website"
              error={errors.website}
            />
          </FormGroup>

          {/* PERSONAL INFORMATION */}
          <FormGroup
            title="Personal Information"
            subtitle="Your personal information will be visible to other users on your profile."
            icon={User}
            column={2}
          >
            <DateFormField
              form={form}
              name="dateOfBirth"
              placeholder="Date of Birth"
              error={errors.dateOfBirth}
            />
            <SelectFormField
              form={form}
              name="gender"
              placeholder="Select Your gender"
              error={errors.gender}
              options={transformGenderOptions}
            />
            <SelectFormField
              form={form}
              name="pronouns"
              placeholder="Select Your pronouns"
              error={errors.pronouns}
              options={transformPronounsOptions}
            />

            <TextareaFormField
              form={form}
              name="headline"
              placeholder="What is your headline?"
              error={errors.headline}
            />
          </FormGroup>

          {/* SOCIAL LINK */}
          <FormGroup
            title="Social Link"
            subtitle="Your social link will be visible to other users on your profile."
            icon={Share2}
            column={2}
          >
            <SocialFormField
              form={form}
              name="linkedin"
              placeholder="Linkedin"
              error={errors.linkedin}
              icon="Linkedin"
              iconClassName="text-muted-foreground"
            />

            <SocialFormField
              form={form}
              name="github"
              placeholder="Github"
              error={errors.github}
              icon="Github"
              iconClassName="text-muted-foreground"
            />

            <SocialFormField
              form={form}
              name="twitter"
              placeholder="Twitter"
              error={errors.twitter}
              icon="Twitter"
              iconClassName="text-muted-foreground"
            />

            <SocialFormField
              form={form}
              name="facebook"
              placeholder="Facebook"
              error={errors.facebook}
              icon="Facebook"
              iconClassName="text-muted-foreground"
            />

            <SocialFormField
              form={form}
              name="instagram"
              placeholder="Instagram"
              error={errors.instagram}
              icon="Instagram"
              iconClassName="text-muted-foreground"
            />
          </FormGroup>

          {/* SUBMIT */}
          <div>
            <Button
              type="submit"
              variant="success"
              className="h-12 w-full"
              disabled={isLoading || !isValid}
            >
              Update Profile
            </Button>
          </div>
        </form>
      </Form>
      <pre>
        profileData:<code>{JSON.stringify(profileData.data, null, 2)}</code>
      </pre>
      <pre>
        profile:<code>{JSON.stringify(profile, null, 2)}</code>
      </pre>
    </div>
  );
};

export default ProfileUpdateForm;
