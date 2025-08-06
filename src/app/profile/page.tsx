"use client";

import { Main } from '@/components/common/main';
import { Profile } from '@/components/profile/profile';
import { XtreamAddForm } from '@/components/xtream/xtream-add-form';
import { useXtreamCredentials } from '@/hooks/use-xtream-credentials';
import { Spinner } from '@/components/ui/spinner';
import { BottomNavBar } from '@/components/common/navbar/bottom-navbar';
import { useLocalXtreamData } from '@/hooks/use-local-xtream-data';
import { useState } from 'react';
import { BottomSheet } from '@/components/ui/bottom-sheet';

export default function MySpacePage() {
  const { credentials, isLoading: loadingCredentials } = useXtreamCredentials();
  const { profileDetails, isLoading: loadingData } = useLocalXtreamData();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isLoading = loadingCredentials || loadingData;

  return (
    <Main>
      {isLoading ? (
        <div className="flex justify-center items-center pt-[25vh]">
          <Spinner />
        </div>
      ) : credentials ? (
        <Profile details={profileDetails} onRefreshClick={() => setIsSheetOpen(true)} />
      ) : (
        <div className="flex justify-center items-center pt-[12.5vh]">
          <XtreamAddForm />
        </div>
      )}
      <BottomNavBar />

      <BottomSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        title="Refrescar todo el contenido"
        content="¿Quieres refrescar todo el contenido? Esto incluye el contenido de películas, series y live streams."
        onSuccess={() => setIsSheetOpen(false)}
        onCancel={() => setIsSheetOpen(false)}
        successText="Refrescar contenido"
      />
    </Main>
  );
}
