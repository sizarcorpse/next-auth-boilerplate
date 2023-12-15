"use client";

import { updateUser } from "@/actions";
import { FormGroup, TextFormField } from "@/components/elements";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
// import { useUserProfileSwr } from "@/hooks/user";
import { UserValidation } from "@/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import _ from "lodash";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

const UserAccountSettingForm = ({ userData }: { userData: User }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { data: session, update } = useSession();
  const router = useRouter();
  // if use api route:
  // const { user: cv, mutateProfile } = useUserSwr({
  //   initUserData: userData,
  // });

  const user = _.merge({}, userData);
  const isEmailVerified = user?.emailVerified;

  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      username: user?.username || undefined,
      email: user?.email || undefined,
      name: user?.name || undefined,
      currentPassword: undefined,
      newPassword: undefined,
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  const handleUpdateUser = async (values: z.infer<typeof UserValidation>) => {
    setIsLoading(true);

    try {
      startTransition(async () => {
        const res = await updateUser({
          username: values.username,
          email: values.email,
          name: values.name,
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        });

        if (res?.status === "error") {
          setIsLoading(false);
          toast.error(res?.message);
          reset();
          return;
        }

        await update({
          ...session,
          user: {
            ...session?.user,
            name: res?.data?.name,
            username: res?.data?.username,
            email: res?.data?.email,
          },
        });
        router.refresh();
        setIsLoading(false);
        toast.success("User updated successfully.");
      });
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(handleUpdateUser)} className="space-y-10">
          <FormGroup title="User Information" column={1}>
            <TextFormField
              form={form}
              name="name"
              placeholder="Full Name"
              error={errors.name}
            />
          </FormGroup>
          <FormGroup
            title="Username"
            subtitle="Your `username` must have to unique and alphanumeric. `username` cant not start with a digit and must contain only lowercase letters, digits, underscore and dot [a-z0-9_.]"
            column={1}
          >
            <TextFormField
              form={form}
              name="username"
              placeholder="Full Name"
              error={errors.username}
            />
          </FormGroup>
          <FormGroup
            title="Email Address"
            subtitle="Your `email` must have to unique and valid. Only gmail, outlook, hotmail, yahoo and proton are allowed. This `email` will only visible to you."
            column={1}
            className={
              isEmailVerified
                ? " bg-success text-success-foreground p-4 rounded-md"
                : " bg-destructive text-destructive-foreground p-4 rounded-md"
            }
          >
            <TextFormField
              form={form}
              name="email"
              placeholder="Email Address"
              error={errors.email}
            />
            <div>
              {isEmailVerified ? (
                <span className="text-xs font-light">Email Verified</span>
              ) : (
                <span className="text-xs font-light">
                  Email not verified.{" "}
                  <Link href="#" className="underline">
                    Verify now{" "}
                  </Link>
                </span>
              )}
            </div>
          </FormGroup>

          <FormGroup
            title="Password"
            subtitle="Your `password` must have to be 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character."
            column={1}
          >
            <TextFormField
              form={form}
              name="currentPassword"
              placeholder="Current Password"
              error={errors.currentPassword}
              type="password"
            />
            <TextFormField
              form={form}
              name="newPassword"
              placeholder="New Password"
              error={errors.newPassword}
              type="password"
            />
          </FormGroup>

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
              Update Account
              {isPending && (
                <span className="inline-flex ml-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserAccountSettingForm;
