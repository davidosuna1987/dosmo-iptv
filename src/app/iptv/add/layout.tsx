import { BottomNavBar } from '@/components/common/navbar/bottom-navbar';
import type {Metadata} from 'next';
import '../../globals.css';

export const metadata: Metadata = {
  title: 'DOSMO IPTV',
  description: '¿Cansado de no encontrar una plataforma para reproducir tu contenido IPTV intuitiva y atractiva? ¡DOSMO IPTV tiene un estilo cuidado y las funcionalidades que estabas buscando!',
};

export default function IPTVAddLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        {children}
        <BottomNavBar />
      </>
  );
}
