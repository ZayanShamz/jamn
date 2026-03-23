"use client";

import { useState, useRef } from "react";

import { PLATFORMS } from "@/lib/suggestions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlatformComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function PlatformCombobox({
  value,
  onChange,
  placeholder = "Job platform",
}: PlatformComboboxProps) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLUListElement>(null);

  const filtered = PLATFORMS.filter((p) =>
    p.toLowerCase().includes(value.trim().toLowerCase()),
  );

  const handleOptionMouseDown = (e: React.MouseEvent, platform: string) => {
    e.preventDefault();
    onChange(platform);
    setOpen(false);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setOpen(true);
  };

  const handleBlur = (e: React.FocusEvent) => {
    const relatedTarget = e.relatedTarget as Node;
    if (popoverRef.current?.contains(relatedTarget)) return;
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter") setOpen(true);
      return;
    }
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const first = popoverRef.current?.querySelector<HTMLElement>(
        "[data-platform-item]",
      );
      first?.focus();
    }
  };

  const handleItemKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    platform: string,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      onChange(platform);
      setOpen(false);
      inputRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = e.currentTarget.nextElementSibling as HTMLElement;
      next?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = e.currentTarget.previousElementSibling as HTMLElement;
      if (prev) {
        prev?.focus();
      } else {
        inputRef.current?.focus();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="platform" className="text-muted-foreground">
        Platform
      </Label>
      <div className="relative">
        <Input
          ref={inputRef}
          id="platform"
          placeholder={placeholder}
          value={value}
          autoComplete="off"
          onChange={handleInputChange}
          onFocus={() => filtered.length > 0 && setOpen(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="pr-10 rounded-none bg-white"
          required
        />
        <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

        {open && filtered.length > 0 && (
          <ul
            ref={popoverRef}
            className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md overflow-y-auto max-h-48 p-1"
            role="listbox"
          >
            {filtered.map((platform) => (
              <li
                key={platform}
                data-platform-item
                role="option"
                aria-selected={value === platform}
                tabIndex={-1}
                onMouseDown={(e) => handleOptionMouseDown(e, platform)}
                onKeyDown={(e) => handleItemKeyDown(e, platform)}
                className={cn(
                  "flex items-center gap-2 px-2 py-1.5 rounded-sm text-sm cursor-pointer",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus:bg-accent focus:text-accent-foreground focus:outline-none",
                  value === platform && "font-medium",
                )}
              >
                <Check
                  className={cn(
                    "h-4 w-4",
                    value === platform ? "opacity-100" : "opacity-0",
                  )}
                />
                {platform}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
