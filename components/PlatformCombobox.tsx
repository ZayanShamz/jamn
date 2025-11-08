"use client";

import { useState, useRef, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { Label } from "./ui/label";

const ALL_PLATFORMS = [
  "LinkedIn",
  "Indeed",
  "Glassdoor",
  "Wellfound",
  "Dice",
  "Monster",
  "ZipRecruiter",
] as const;

interface PlatformComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function PlatformCombobox({
  value: propValue,
  onChange,
  placeholder = "Job platform",
}: PlatformComboboxProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(propValue);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Sync external value
  useEffect(() => {
    setInputValue(propValue);
  }, [propValue]);

  // Filter platforms (trim to ignore spaces)
  const filtered = ALL_PLATFORMS.filter((platform) =>
    platform.toLowerCase().includes(inputValue.trim().toLowerCase())
  );

  // Reset selection when input changes
  useEffect(() => {
    setSelectedIndex(-1);
  }, [inputValue]);

  const selectPlatform = (platform: string) => {
    setInputValue(platform);
    onChange(platform);
    setOpen(false);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const trimmedVal = val.trimStart();
    setInputValue(val);
    onChange(trimmedVal);
    if (!open) setOpen(true);
  };

  const handleInputFocus = () => {
    if (filtered.length > 0) setOpen(true);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      selectPlatform(filtered[selectedIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.focus();
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && itemsRef.current[selectedIndex]) {
      itemsRef.current[selectedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  // Prevent popover focus stealing
  const preventFocus = (e: Event) => e.preventDefault();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>
          <Label
            htmlFor="platform_combobox"
            className="text-muted-foreground mb-1"
          >
            Platform
          </Label>
          <div className="relative">
            <Input
              ref={inputRef}
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onKeyDown={handleKeyDown}
              id="platform"
              className="pr-10 rounded-none bg-white"
              required
              onBlur={(e) => {
                setTimeout(() => {
                  if (
                    !e.relatedTarget ||
                    !e.relatedTarget.closest("[cmdk-item]")
                  ) {
                    setOpen(false);
                  }
                }, 150);
              }}
            />
            <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-0 max-h-48 overflow-y-auto"
        align="start"
        onOpenAutoFocus={preventFocus}
        onCloseAutoFocus={preventFocus}
      >
        <Command shouldFilter={false}>
          <CommandList>
            {filtered.length === 0 ? (
              <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                No platform found.
              </CommandEmpty>
            ) : (
              filtered.map((platform, index) => (
                <CommandItem
                  key={platform}
                  ref={(el) => {
                    itemsRef.current[index] = el;
                  }}
                  value={platform}
                  onSelect={() => selectPlatform(platform)}
                  className={`cursor-pointer ${
                    index === selectedIndex
                      ? "bg-accent text-accent-foreground"
                      : ""
                  }`}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      inputValue === platform ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {platform}
                </CommandItem>
              ))
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
