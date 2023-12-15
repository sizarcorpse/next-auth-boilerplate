"use server";

import { cookies } from "next/headers";

const getUserToken = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("next-auth.session-token");
  return `next-auth.session-token=${token?.value}`;
};

export default getUserToken;
