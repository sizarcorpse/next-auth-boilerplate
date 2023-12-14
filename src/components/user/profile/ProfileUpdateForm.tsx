"use client";

import { updateUserProfile } from "@/actions";
import {
  DateFormField,
  FormGroup,
  SelectFormField,
  SocialFormField,
  TextFormField,
  TextareaFormField,
} from "@/components/elements";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
// import { useUserProfileSwr } from "@/hooks/user";
import {
  ProfileValidator,
  genderOptions,
  pronounsOptions,
} from "@/validators/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gender, Profile, Pronouns } from "@prisma/client";
import _ from "lodash";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

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

// get value or undefined
function dv(value: any) {
  return value || undefined;
}
const ProfileUpdateForm = ({ profileData }: { profileData?: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  // if use api route:
  // const { profile: cv, mutateProfile } = useUserProfileSwr({
  //   initProfileData: profileData,
  // });

  const profile = _.merge({}, profileData);

  const form = useForm<z.infer<typeof ProfileValidator>>({
    resolver: zodResolver(ProfileValidator),
    defaultValues: {
      designation: dv(profile?.designation),
      company: dv(profile?.company),
      website: dv(profile?.website),
      location: dv(profile?.location),
      publicEmail: dv(profile?.publicEmail),
      publicPhone: dv(profile?.publicPhone),
      gender:
        profile?.gender === "NOT_SELECTED"
          ? undefined
          : (profile?.gender as keyof typeof Gender),
      pronouns:
        profile?.pronouns === "DONT_SPECIFY"
          ? undefined
          : (profile?.pronouns as keyof typeof Pronouns),
      headline: dv(profile?.headline),
      biography: dv(profile?.biography),
      dateOfBirth: dv(profile?.dateOfBirth),
      linkedin: dv(profile?.linkedin),
      github: dv(profile?.github),
      twitter: dv(profile?.twitter),
      facebook: dv(profile?.facebook),
      instagram: dv(profile?.instagram),
      discord: dv(profile?.discord),
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const handleUpdateProfile = async (
    values: z.infer<typeof ProfileValidator>
  ) => {
    setIsLoading(true);
    try {
      // if use api route:
      // const res = await fetch("/api/user/profile", {
      //   method: "PATCH",
      //   body: JSON.stringify(values),
      // });
      // const json = await res.json();

      // if (!res.ok) {
      //   throw new Error(json.message);
      // }
      // toast.success(json.message);
      // mutateProfile(json, false);

      startTransition(async () => {
        await updateUserProfile({
          designation: values.designation,
          company: values.company,
          website: values.website,
          location: values.location,
          publicEmail: values.publicEmail,
          publicPhone: values.publicPhone,
          gender: values.gender,
          pronouns: values.pronouns,
          headline: values.headline,
          biography: values.biography,
          dateOfBirth: values.dateOfBirth,
          linkedin: values.linkedin,
          github: values.github,
          twitter: values.twitter,
          facebook: values.facebook,
          instagram: values.instagram,
          discord: values.discord,
        });
      });
      toast.success("Profile updated successfully");
      setIsLoading(false);
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
          className="space-y-10"
        >
          {/* COMPANY */}
          <FormGroup
            title="Company Information"
            subtitle="Your company information will be visible to other users on your profile."
            icon="Building2"
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
            <TextFormField
              form={form}
              name="website"
              placeholder="Website"
              error={errors.website}
            />
          </FormGroup>

          {/* CONTACT INFORMATION */}
          <FormGroup
            title="Contact Information"
            subtitle="Your contact information will be visible to other users on your profile."
            icon="Fingerprint"
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
          </FormGroup>

          {/* PERSONAL INFORMATION */}
          <FormGroup
            title="Personal Information"
            subtitle="Your personal information will be visible to other users on your profile."
            icon="User"
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
          </FormGroup>

          {/* BIOGRAPHY */}
          <FormGroup
            title="Biography"
            subtitle="Your biography will be visible to other users on your profile."
            icon="FileText"
            column={1}
          >
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
            icon="Share2"
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
            <SocialFormField
              form={form}
              name="discord"
              placeholder="Discord"
              error={errors.instagram}
              icon="Discord"
              iconClassName="text-muted-foreground"
            />
          </FormGroup>

          {/* SUBMIT */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="h-12 border-none"
              disabled={isLoading || !isValid || isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="success"
              className="h-12"
              disabled={isLoading || !isValid || isPending}
            >
              Update Profile
              {isPending && (
                <span className="inline-flex ml-2">
                  <Loader2 className="w-4 h-4" />
                </span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileUpdateForm;
