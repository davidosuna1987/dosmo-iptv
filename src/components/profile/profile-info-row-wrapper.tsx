export function ProfileInfoRowWrapper({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="px-3 space-y-1 rounded-lg bg-card">
            {children}
        </div>
    )
}