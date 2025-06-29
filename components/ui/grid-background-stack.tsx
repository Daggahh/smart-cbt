"use client";
import { cn } from "@/lib/utils";
import React from "react";

export function GridBackgroundStack({
  className,
  fade = "both",
}: {
  className?: string;
  fade?: "up" | "down" | "both";
}) {
  let maskClass = "";
  if (fade === "up") {
    maskClass =
      "[mask-image:linear-gradient(to_top,white,white_80%,transparent)]";
  } else if (fade === "down") {
    maskClass =
      "[mask-image:linear-gradient(to_bottom,white,white_80%,transparent)]";
  } else {
    maskClass =
      "[mask-image:linear-gradient(to_bottom,transparent,white_20%,white_80%,transparent)]";
  }
  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full",
        "[background-size:40px_40px]",
        "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
        "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        maskClass,
        className
      )}
    />
  );
}
