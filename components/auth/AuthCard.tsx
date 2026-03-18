export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-svh w-full flex items-center justify-center">
      <div className="w-[75%] sm:w-[60%] md:w-[40%] lg:w-[30%] flex flex-col gap-3 p-8 border dark:border-amber-50">
        {children}
      </div>
    </div>
  );
}
