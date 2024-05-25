"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { exportToBlob } from "@excalidraw/excalidraw";
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'

export default function Page() {
  return (
    <div className="relative min-h-screen">
      <button className="absolute right-1 top-1"><AdjustmentsHorizontalIcon width={32} height={32}  /></button>
      <textarea
        rows={5}
        name="comment"
        id="comment"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Add your comment..."
        defaultValue={""}
      ></textarea>
    </div>
  );
}
