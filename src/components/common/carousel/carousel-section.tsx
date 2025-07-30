export function CarouselSection({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col mt-6 space-y-4 md:space-y-6 lg:space-y-8">
      {children}
    </section>
  )
}