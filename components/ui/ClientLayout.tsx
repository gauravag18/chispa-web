"use client";
import { motion } from "motion/react";
import React from "react";
import { AuroraBackground } from "../ui/aurora-background";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuroraBackground className="min-h-screen">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative min-h-screen"
      >
        {children}
      </motion.div>
    </AuroraBackground>
  );
}