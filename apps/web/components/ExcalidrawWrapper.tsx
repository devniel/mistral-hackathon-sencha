"use client";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import dynamic from "next/dynamic";
import { forwardRef } from "react";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);

const ExcalidrawWrapper = forwardRef(function ExcalidrawInner({
  height,
  width,
  excalidrawAPI,
}: {
  height: string;
  width: string;
  excalidrawAPI: (api: ExcalidrawImperativeAPI) => void;
}, ref) {
  return (
    <div style={{ height, width }}>
      <Excalidraw excalidrawAPI={excalidrawAPI} />
    </div>
  );
});

export default ExcalidrawWrapper;
