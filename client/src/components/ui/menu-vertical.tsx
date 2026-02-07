"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type MenuItem = {
  label: string;
  href: string;
  onClick?: () => void;
};

interface MenuVerticalProps {
  menuItems: MenuItem[];
  color?: string;
  skew?: number;
}

export const MenuVertical = ({
  menuItems = [],
  color = "#0044CC",
  skew = 0,
}: MenuVerticalProps) => {
  return (
    <div className="flex w-fit max-w-full flex-col gap-6 px-6">
      {menuItems.map((item, index) => (
        <motion.div
          key={`${item.href}-${index}`}
          className="group/nav flex items-center gap-4 cursor-pointer text-black"
          initial="initial"
          whileHover="hover"
        >
          <motion.div
            variants={{
              initial: { x: "-100%", color: "inherit", opacity: 0 },
              hover: { x: 0, color, opacity: 1 },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="z-0"
          >
            <ArrowRight strokeWidth={3} className="size-6 md:size-8" />
          </motion.div>

          <Link
            href={item.href}
            onClick={item.onClick}
            className="no-underline"
          >
            <motion.span
              variants={{
                initial: { x: -40, color: "inherit" },
                hover: { x: 0, color, skewX: skew },
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="font-bold text-2xl md:text-3xl lg:text-4xl block tracking-tighter"
            >
              {item.label}
            </motion.span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
