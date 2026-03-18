interface FormFieldProps {
  error?: string;
  children: React.ReactNode;
}

export function FormField({ error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col">
      {children}
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
}
