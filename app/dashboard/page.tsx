import Navbar from "@/components/Navbar";
import React from "react";

function dashboard() {
  return (
    <>
      <Navbar />
      <div className="h-dvh w-full">
        <div className="flex min-h-screen items-center justify-center">
          <h1 className="text-3xl font-bold cursor-default">Dashboard</h1>
        </div>
      </div>
    </>
  );
}

export default dashboard;
