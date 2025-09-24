"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { WorldMapDemo } from "../components/ui/world-map-demo";
import { FloatingDock } from "../components/ui/floating-dock";
import { IconArrowUp, IconHistory, IconHome } from "@tabler/icons-react";

export default function Home() {
  const dockItems = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "Input",
      icon: (
        <IconArrowUp className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/input",
    },
    {
      title: "History",
      icon: (
        <IconHistory className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/history",
    },
  ];

  return (
    <main className="relative text-gray-900">

      {/* Hero */}
      <section className="py-8 px-6 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Left Side: CHISPA Content */}
        <div className="flex-[2] text-center md:text-left">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            CHISPA
          </motion.h1>
          <motion.p
            className="mt-4 text-lg md:text-xl max-w-lg mx-auto md:mx-0 text-gray-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            AI-Powered Go to Market Strategy for Early-Stage Founders
          </motion.p>
          <motion.div
            className="mt-8 flex justify-center md:justify-start gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <Link
              href="/input"
              className="px-8 py-3 rounded-full bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 transition-transform hover:scale-105"
            >
              Try It
            </Link>
          </motion.div>
        </div>
        {/* Right Side: World Map */}
        <motion.div
          className="flex-1 w-full md:ml-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        >
          <div className="scale-110">
            <WorldMapDemo />
          </div>
        </motion.div>
      </section>
      {/* Pain Point Section */}
      <motion.section
        id="problem"
        className="py-8 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">The Pain Point</h2>
          <p className="text-gray-700 leading-relaxed">
            Early stage founders struggle with fragmented insights, lack of
            structured guidance, and overwhelming market data when building
            their go to market (GTM) strategy.
          </p>
        </div>
      </motion.section>
      {/* Solution Section */}
      <motion.section
        id="solution"
        className="py-8 px-6 pb-16" // Added pb-16 for extra scroll space
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Our Solution</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              className="p-6 bg-white/80 backdrop-blur rounded-2xl shadow-md hover:shadow-lg transition-transform hover:scale-105 border border-indigo-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-indigo-600 mb-2">Input</h3>
              <p className="text-gray-700 text-sm">
                Founders provide industry, target market, product, and resources.
              </p>
            </motion.div>
            <motion.div
              className="p-6 bg-white/80 backdrop-blur rounded-2xl shadow-md hover:shadow-lg transition-transform hover:scale-105 border border-indigo-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-indigo-600 mb-2">AI Engine</h3>
              <p className="text-gray-700 text-sm">
                AI synthesizes inputs into GTM strategies, competitor insights,
                and positioning.
              </p>
            </motion.div>
            <motion.div
              className="p-6 bg-white/80 backdrop-blur rounded-2xl shadow-md hover:shadow-lg transition-transform hover:scale-105 border border-indigo-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-indigo-600 mb-2">Dashboard</h3>
              <p className="text-gray-700 text-sm">
                Clean, actionable dashboard with downloadable pitch-ready
                outputs.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Floating Dock */}
      <FloatingDock
        desktopClassName="fixed bottom-4 left-1/2 -translate-x-1/2"
        mobileClassName="fixed bottom-4 right-4"
        items={dockItems}
      />
    </main>
  );
}