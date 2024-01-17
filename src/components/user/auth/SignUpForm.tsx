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
import {
  userRegistrationValidation,
  type UserRegistrationValidationRequest,
} from "@/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

// TODO: Check username availability.

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserRegistrationValidationRequest>({
    resolver: zodResolver(userRegistrationValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmit = async (values: UserRegistrationValidationRequest) => {
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
