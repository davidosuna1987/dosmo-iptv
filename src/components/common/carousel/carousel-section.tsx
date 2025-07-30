export function CarouselSection({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col mt-6 space-y-4">
      {children}
    </section>
  )
}