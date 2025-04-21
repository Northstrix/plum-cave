"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TooltipItem {
  id: number;
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface AnimatedTooltipProps {
  items: TooltipItem[];
  isRTL: boolean;
}

export const AnimatedTooltip: React.FC<AnimatedTooltipProps> = ({ items, isRTL }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex space-x-2">
      {items.map((item) => (
        <div
          className="group relative"
          key={item.id}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                style={{
                    whiteSpace: "nowrap",
                    position: 'absolute',
                    width: '56px', // Icon Width
                    top: '-3.5rem',
                  }}
                className="z-50 flex flex-col items-center justify-center px-4 py-2 text-sm"
              >
                <div className="relative z-30 text-base font-bold text-[var(--foreground)] bg-[var(--background)] border border-[var(--lightened-background-adjacent-color)] px-5 py-3">
                  {item.name}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div
            onClick={(e) => {
              e.stopPropagation();
              item.onClick();
            }}
            className="relative !m-0 h-14 w-14 flex items-center justify-center cursor-pointer transition duration-300 group-hover:z-30 group-hover:scale-105 border border-[var(--lightened-background-adjacent-color)] bg-[var(--background)] rounded-lg hover:text-[var(--first-theme-color)]"
            style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
          >
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};
