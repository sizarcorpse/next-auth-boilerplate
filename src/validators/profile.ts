import { z } from "zod";

const linkedin =
  /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9\-_]+\/?$/i;
const github = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/i;
const twitter = /^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9_\.]+\/?$/i;
const facebook = /^(https?:\/\/)?(www\.)?facebook\.com\/[a-z0-9_\.]+\/?$/i;
const instagram = /^(https?:\/\/)?(www\.)?instagram\.com\/[a-z0-9_\.]+\/?$/i;
const discord = /^.{3,32}#[0-9]{4}$/i;
const website = /^(https?:\/\/)?[a-z0-9-]+(\.[a-z0-9-]+)+([/?].*)?$/i;
const email =
  /^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail|yahoo|proton)\.[a-zA-Z]{2,}$/i;
const phone =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

export const genderOptions = [
  "MALE",
  "FEMALE",
  "OTHER",
  "NOT_SELECTED",
] as const;
export const pronounsOptions = [
  "HE_HIM",
  "SHE_HER",
  "THEY_THEM",
  "DONT_SPECIFY",
  "OTHER",
] as const;

export const ProfileValidator = z.object({
  designation: z.string().min(2).max(50).nullish().or(z.literal("")),
  company: z.string().min(3).max(50).nullish().or(z.literal("")),
  website: z.string().min(5).regex(website).nullish().or(z.literal("")),
  location: z.string().min(3).max(50).nullish().or(z.literal("")),
  publicEmail: z.string().regex(email).nullish().or(z.literal("")),
  publicPhone: z.string().regex(phone).nullish().or(z.literal("")),
  gender: z.enum(genderOptions).nullish(),
  pronouns: z.enum(pronounsOptions).nullish(),
  headline: z.string().min(1).max(200).nullish().or(z.literal("")),
  biography: z.object({}),
  dateOfBirth: z.date().nullish().or(z.literal("")),
  linkedin: z.string().regex(linkedin).nullish().or(z.literal("")),
  github: z.string().regex(github).nullish().or(z.literal("")),
  twitter: z.string().regex(twitter).nullish().or(z.literal("")),
  facebook: z.string().regex(facebook).nullish().or(z.literal("")),
  instagram: z.string().regex(instagram).nullish().or(z.literal("")),
  discord: z.string().regex(discord).nullish().or(z.literal("")),
});

export type ProfileUpdateRequest = z.infer<typeof ProfileValidator>;
