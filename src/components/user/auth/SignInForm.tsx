"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";
const userSchema = z.object({
  email: z
    .string()
    .email()
    .refine(
      (email) => {
        const domain = email.split("@")[1];
        return [
          "gmail.com",
          "outlook.com",
          "hotmail.com",
          "yahoo.com",
        ].includes(domain);
      },
      {
        message:
          "Email domain must be either gmail.com, outlook.com, hotmail.com, or yahoo.com",
      }
    ),
  password: z
    .string()
    .min(8)
    .max(50)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%^*#?&]{8,50}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    }),
});

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (!res?.error) {
        toast.success("Logged in");
        await getSession();
        router.refresh();
        setIsLoading(false);
        router.push("/");
      } else {
        throw new Error(res.error);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithIcon
                    {...field}
                    icon="Mail"
                    placeholder="Email"
                    className={`h-12 bg-primary-foreground/5 border-primary/80 text-primary-foreground ${
                      errors.email
                        ? "border-destructive focus-visible:ring-destructive"
                        : "border-transparent"
                    }`}
                  />
                </FormControl>
                <FormMessage className="text-xs font-light" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithIcon
                    {...field}
                    icon="KeyRound"
                    placeholder="Password"
                    type="password"
                    className={`h-12 bg-primary-foreground/5 border-primary/80 text-primary-foreground ${
                      errors.password
                        ? "border-destructive focus-visible:ring-destructive"
                        : "border-transparent"
                    }`}
                  />
                </FormControl>
                <FormMessage className="text-xs font-light" />
              </FormItem>
            )}
          />
          <div>
            <Button
              type="submit"
              variant="success"
              className="h-12 w-full"
              disabled={isLoading || !isValid}
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
