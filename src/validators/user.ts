import { z } from "zod";

export const UserValidation = z.object({
  name: z.string().min(3).max(30),
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
  currentPassword: z.string().min(8).max(50).or(z.null().nullish()),
  newPassword: z
    .string()
    .min(8)
    .max(50)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%^*#?&]{8,50}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    })
    .or(z.null().nullish()),
});

export const userRegistrationValidation = z
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

export const userSigninValidation = z.object({
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

export type UserValidationRequest = z.infer<typeof UserValidation>;
export type UserRegistrationValidationRequest = z.infer<
  typeof userRegistrationValidation
>;
export type UserSigninValidationRequest = z.infer<typeof userSigninValidation>;
