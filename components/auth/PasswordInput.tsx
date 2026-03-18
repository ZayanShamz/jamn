"use client";
import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [show, setShow] = useState(false);

    return (
      <div className="w-full relative">
        <input
          {...props}
          ref={ref}
          type={show ? "text" : "password"}
          className="border py-2 px-3 pr-10 w-full h-12"
        />
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer select-none px-3 py-2 rounded-r-md rounded-l-3xl"
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
