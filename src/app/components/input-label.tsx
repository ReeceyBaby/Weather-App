export function InputLabel({ label, children }: { label: string; children: React.ReactNode | React.ReactNode[]; }) {
  return <div className="block flex flex-col gap-1 w-full pb-[2px]">
    <label className="uppercase font-inter-tight text-sm font-semibold">{label}</label>
    <div>{children}</div>
  </div>;
};