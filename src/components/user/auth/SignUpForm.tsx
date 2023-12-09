"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { useState } from "react";

const userSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        message: "Name is too short",
      })
      .max(50),
    username: z
      .string()
      .min(3)
      .max(50)
      .trim()
      .regex(/^[a-z0-9_]+$/i, {
        message:
          "Username can only contain alphanumeric characters and underscores",
      }),
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
    passwordConfirmation: z.string().min(8).max(50),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

// TODO: Check username availability.

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
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
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setIsLoading(false);
        toast.error((await response.json()).message);
        return;
      }

      await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: `/`,
      });
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithIcon
                    {...field}
                    icon="Type"
                    placeholder="Name"
                    className={`h-12 bg-primary-foreground/5 border-primary/80 text-primary-foreground ${
                      errors.name
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithIcon
                    {...field}
                    icon="User"
                    placeholder="Username"
                    className={`h-12 bg-primary-foreground/5 border-primary/80 text-primary-foreground ${
                      errors.username
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
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithIcon
                    {...field}
                    icon="KeyRound"
                    placeholder="Confirm password"
                    type="password"
                    className={`h-12 bg-primary-foreground/5 border-primary/80 text-primary-foreground ${
                      errors.passwordConfirmation
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

export default SignUpForm;
