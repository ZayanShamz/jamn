"use client";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import LogoutButton from "./LogoutButton";

interface NavbarProps {
  onNewJob?: () => void;
}

export default function Navbar({ onNewJob }: NavbarProps) {
  return (
    <>
      <div className="w-full p-3 fixed z-50 start-0 top-0 flex justify-between bg-[#171616]">
        <h1 className="text-2xl font-bold text-amber-50 cursor-default">
          jamn!
        </h1>
        <Button className="rounded-none" onClick={onNewJob}>
          New Job <Plus />
        </Button>
        <LogoutButton />
      </div>
    </>
  );
}
