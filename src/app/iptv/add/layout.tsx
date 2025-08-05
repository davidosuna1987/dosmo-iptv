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
    <html lang="es">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
    </head>
    <body className="font-body antialiased">
    {children}
    </body>
  </html>
  );
}
