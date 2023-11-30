"use client";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function Accordion({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="grid gap-2">
      <header
        className="flex cursor-pointer select-none items-center justify-between gap-2 rounded-2xl bg-gray-100 p-4"
        onClick={() => setOpen((prevState) => !prevState)}
      >
        <h3>{title}</h3>
        {open && <MinusIcon className="h-5 w-5" />}
        {!open && <PlusIcon className="h-5 w-5" />}
      </header>
      <div
        className={`rounded-2xl border transition ${
          open
            ? "visible h-full w-full translate-y-0 px-4 py-3 opacity-100"
            : "invisible h-0 w-0 translate-y-4 px-0 py-0 opacity-0"
        }`}
      >
        {content}
      </div>
    </div>
  );
}