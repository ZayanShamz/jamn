// components/CustomTextarea.tsx
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface CustomTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hideScrollOnMobile?: boolean;
}

export const CustomTextarea = forwardRef<
  HTMLTextAreaElement,
  CustomTextareaProps
>(({ label, id, hideScrollOnMobile = false, className, ...props }, ref) => (
  <div className="w-full space-y-1">
    <Label htmlFor={id} className="text-muted-foreground text-sm">
      {label}
    </Label>
    <Textarea
      id={id}
      ref={ref}
      className={cn(
        "bg-white overflow-auto leading-6 rounded-none min-h-20 max-h-37",
        hideScrollOnMobile
          ? cn(
              "[&::-webkit-scrollbar]:w-0 sm:[&::-webkit-scrollbar]:w-1.5",
              "[&::-webkit-scrollbar-thumb]:bg-transparent sm:[&::-webkit-scrollbar-thumb]:bg-gray-300",
              "hover:[&::-webkit-scrollbar-thumb]:sm:bg-gray-400",
              "[&::-webkit-scrollbar-thumb]:rounded-full",
              "scrollbar-width-none sm:scrollbar-width-thin"
            )
          : cn(
              "[scrollbar-width:thin]",
              "[scrollbar-color:#d1d5db_transparent]",
              "[&::-webkit-scrollbar]:w-1.5",
              "[&::-webkit-scrollbar-thumb]:rounded-full",
              "[&::-webkit-scrollbar-thumb]:bg-gray-300",
              "hover:[&::-webkit-scrollbar-thumb]:bg-gray-400"
            ),
        "scroll-pt-4 scroll-pb-4 scroll-smooth",
        className
      )}
      {...props}
    />
  </div>
));
CustomTextarea.displayName = "CustomTextarea";
