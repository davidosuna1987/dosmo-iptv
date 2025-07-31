export function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-background text-white px-4 md:px-6">
      {children}
    </main>
  )
}