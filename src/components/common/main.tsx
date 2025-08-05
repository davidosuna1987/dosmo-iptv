export function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-background mx-auto text-white px-4 md:px-6 pb-20 min-h-screen flex flex-col w-full max-w-[1500px]">
      {children}
    </main>
  )
}