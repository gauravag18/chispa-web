"use client";
import { AuroraBackground } from "../ui/aurora-background";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuroraBackground className="min-h-screen">
      <div className="relative min-h-screen">
        {children}
      </div>
    </AuroraBackground>
  );
}