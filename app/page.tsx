"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { WorldMapDemo } from "../components/ui/world-map-demo";
import { FloatingDock } from "../components/ui/floating-dock";
import { IconArrowUp, IconHistory, IconHome, IconArrowDown } from "@tabler/icons-react";
import { useRef } from "react";

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

  const chispaText = "Chispa".split("");
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const painPointRef = useRef<HTMLElement>(null);

  const scrollToPainPoint = () => {
    painPointRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative text-gray-900 min-h-screen pb-32">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap');
        .kaushan-script {
          font-family: "Kaushan Script", cursive;
          font-weight: 400;
          font-style: normal;
        }
      `}</style>
      {/* Hero */}
      <section className="py-12 px-6 flex flex-col lg:flex-row items-center justify-between gap-8 max-w-[95vw] mx-auto min-h-[85vh]">
        {/* Left Side: CHISPA Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.h1
            className="text-6xl lg:text-8xl font-extrabold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent kaushan-script"
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            {chispaText.map((letter, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                custom={idx}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            className="mt-6 text-xl lg:text-2xl max-w-xl mx-auto lg:mx-0 text-gray-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            AI-Powered Go to Market Strategy for Early Stage Founders
          </motion.p>
          <motion.div
            className="mt-10 flex justify-center lg:justify-start gap-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <Link
              href="/input"
              className="px-10 py-4 rounded-full bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 transition-transform hover:scale-105"
            >
              Try It
            </Link>
          </motion.div>
        </div>
        {/* Right Side: World Map */}
        <motion.div
          className="flex-1 w-full mt-8 lg:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        >
          <div className="scale-100 lg:scale-110">
            <WorldMapDemo />
          </div>
        </motion.div>
      </section>
      {/* Explore Section */}
      <motion.section
        className="py-1 px-6 text-center -mt-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <button
            onClick={scrollToPainPoint}
            className="flex items-center justify-center mx-auto gap-2 px-8 py-3 rounded-full bg-orange-500 text-white font-medium shadow-md hover:bg-orange-600 transition-transform hover:scale-105"
          >
            <span>Explore Our Approach</span>
            <IconArrowDown className="h-6 w-6" />
          </button>
        </div>
      </motion.section>
      {/* Pain Point Section */}
      <motion.section
        id="problem"
        ref={painPointRef}
        className="py-12 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">The Pain Point</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Early stage founders struggle with fragmented insights, lack of
            structured guidance, and overwhelming market data when building
            their go to market (GTM) strategy.
          </p>
        </div>
      </motion.section>
      {/* Solution Section */}
      <motion.section
        id="solution"
        className="py-12 px-6 pb-32"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Our Solution</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              className="p-6 bg-white/80 backdrop-blur rounded-2xl shadow-md hover:shadow-lg transition-transform hover:scale-105 border border-indigo-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-indigo-600 mb-2 text-lg">Input</h3>
              <p className="text-gray-700 text-base">
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
              <h3 className="font-semibold text-indigo-600 mb-2 text-lg">AI Engine</h3>
              <p className="text-gray-700 text-base">
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
              <h3 className="font-semibold text-indigo-600 mb-2 text-lg">Dashboard</h3>
              <p className="text-gray-700 text-base">
                Clean, actionable dashboard with downloadable pitch-ready
                outputs.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      {/* Floating Dock */}
      <FloatingDock
        desktopClassName="fixed bottom-10 left-1/2 -translate-x-1/2 z-50"
        mobileClassName="fixed bottom-10 right-6 z-50"
        items={dockItems}
      />
    </main>
  );
}