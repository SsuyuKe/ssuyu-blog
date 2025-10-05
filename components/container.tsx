export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[100px] md:pt-[100px]">
      {children}
    </div>
  );
}
