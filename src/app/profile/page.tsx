"use client";

import { Main } from '@/components/common/main';
import { Profile } from '@/components/profile/profile';
import { IptvForm } from '@/components/iptv/iptv-form';
import { useXtreamCredentials } from '@/hooks/use-xtream-credentials';
import { Spinner } from '@/components/ui/spinner';

export default function MySpacePage() {
  const { credentials, isLoading } = useXtreamCredentials();

  return (
    <Main>
      {isLoading ? (
        <div className="flex justify-center items-center pt-[25vh]">
          <Spinner size="10" />
        </div>
      ) : credentials ? (
        <Profile />
      ) : (
        <div className="flex justify-center items-center pt-[12.5vh]">
          <IptvForm />
        </div>
      )}
    </Main>
  );
}
