"use server";

import { redirect } from "next/navigation";

export async function navigate(url: string) {
  const redirectUrl = url ?? "/";
  redirect(redirectUrl);
}
