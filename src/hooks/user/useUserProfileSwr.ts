"use client";

import { Profile } from "@prisma/client";
import useSWR from "swr";

interface ProfileResponse {
  status: string;
  data: Profile;
}

export interface UseUserProfileSwrReturn {
  profile: Profile | undefined;
  isLoading: boolean;
  mutateProfile: (
    data: ProfileResponse,
    shouldRevalidate?: boolean
  ) => Promise<void>;
  error: string | null;
}

interface UseUserProfileSwrProps {
  initProfileData?: ProfileResponse | undefined;
  isRevalidateOnMount?: boolean | undefined;
}

const useUserProfileSwr = ({
  initProfileData,
  isRevalidateOnMount = undefined,
}: UseUserProfileSwrProps) => {
  const getUserProfileKey = `${process.env.NEXT_API_URL}/user/profile`;

  const { data, error, mutate, isValidating } = useSWR<ProfileResponse>(
    getUserProfileKey,
    {
      fallbackData: initProfileData,
      revalidateOnMount: isRevalidateOnMount,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateOnReconnect: true,
      keepPreviousData: true,
    }
  );

  const profile = data ? data.data : undefined;

  const mutateProfile = async (
    data: ProfileResponse,
    shouldRevalidate = true
  ) => {
    await mutate(data, shouldRevalidate);
  };

  return {
    profile,
    isLoading: isValidating,
    mutateProfile,
    error: error?.message,
  };
};

export default useUserProfileSwr;
