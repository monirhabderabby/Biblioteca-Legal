"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface SmoothCollapseProps {
  isOpen: boolean;
  children: ReactNode;
  duration?: number;
}

export function SmoothCollapse({
  isOpen,
  children,
  duration = 0.35,
}: SmoothCollapseProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="smooth-collapse"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
