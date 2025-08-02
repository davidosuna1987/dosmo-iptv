"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useXtreamCredentials } from '@/hooks/use-xtream-credentials';
import { useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { credentials, isLoading } = useXtreamCredentials();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Si no está cargando y no hay credenciales
    if (!isLoading && !credentials) {
      // Y no estamos ya en la página para añadir IPTV, redirigimos
      if (pathname !== '/iptv/add') {
        router.push('/iptv/add');
      }
    }
  }, [isLoading, credentials, pathname, router]);

  // Mientras se cargan las credenciales, mostramos un spinner para evitar parpadeos
  if (isLoading && pathname !== '/iptv/add') {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="10" />
      </div>
    );
  }

  // Si no hay credenciales y estamos en la página de login, la mostramos
  if (!credentials && pathname === '/iptv/add') {
    return <>{children}</>;
  }

  // Si hay credenciales, mostramos el contenido de la página solicitada
  if (credentials) {
    return <>{children}</>;
  }

  // Fallback para cualquier otro caso (como durante la redirección)
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner size="10" />
    </div>
  );
}
