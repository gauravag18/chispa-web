"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex min-h-screen flex-col items-center justify-center bg-gray-100 text-gray-900 dark:bg-gray-300",
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              "--aurora":
                "repeating-linear-gradient(100deg,#f97316_10%,#1e3a8a_15%,#93c5fd_20%,#f8f1e9_25%,#2563eb_30%)",
              "--dark-gradient":
                "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
              "--ivory-gradient":
                "repeating-linear-gradient(100deg,#f8f1e9_0%,#f8f1e9_7%,transparent_10%,transparent_12%,#f8f1e9_16%)",
              "--orange-500": "#f97316",
              "--blue-900": "#1e3a8a",
              "--blue-300": "#93c5fd",
              "--blue-600": "#2563eb",
              "--ivory-50": "#f8f1e9",
              "--gray-100": "#f3f4f6",
              "--gray-300": "#d1d5db",
              "--black": "#000",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--ivory-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-30 blur-[14px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--orange-500)_10%,var(--blue-900)_15%,var(--blue-300)_20%,var(--ivory-50)_25%,var(--blue-600)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--ivory-gradient:repeating-linear-gradient(100deg,var(--ivory-50)_0%,var(--ivory-50)_7%,transparent_10%,transparent_12%,var(--ivory-50)_16%)] after:absolute after:inset-0 after:[background-image:var(--ivory-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};