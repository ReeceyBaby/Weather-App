export function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto px-4 md:px-8 max-w-7xl">{children}</div>;
}
