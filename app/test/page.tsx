"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { CustomTextarea } from "@/components/CustomTextArea";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function TestPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-md transition hover:bg-blue-700"
      >
        Open Modal
      </button>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ---------- Modal ---------- */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className={`
              relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl
              max-h-[90dvh] overflow-y-auto
            `}
          >
            {/* Close button (top-right) */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded-full p-1 text-gray-500 transition hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Title */}
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Modal Title
            </h2>

            {/* Placeholder for future content */}
            <p className="text-gray-600">Add your form, textarea, etc. here.</p>
            <div>
              <Textarea placeholder="enth" />
            </div>

            {/* footer */}
            <div className="flex justify-end mt-3">
              <Button onClick={() => setOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
