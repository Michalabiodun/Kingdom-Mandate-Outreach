"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MenuVertical } from "@/components/ui/menu-vertical";
import { Menu as MenuIcon, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";

interface NavigationItem {
    label: string;
    onClick?: () => void;
    href?: string;
    hasDropdown?: boolean;
}

interface HeaderProps {
    logo?: string;
    navigation?: NavigationItem[];
    headerButtons?: {
        label: string;
        onClick: () => void;
        variant?: "outline" | "ghost" | "solid";
    }[];
    className?: string;
}

export function Header({
    logo = "Kingdom Mandate",
    navigation = [],
    headerButtons = [],
    className,
}: HeaderProps) {
    const router = useRouter();
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    // Body scroll lock
    React.useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);


    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "z-50 flex flex-row items-center justify-between px-6 py-4 md:px-10 md:py-6",
                    isHome ? "absolute top-0 left-0 right-0 bg-white/10 backdrop-blur-sm" : "sticky top-0 bg-white shadow-sm",
                    className
                )}
            >
                {/* Logo */}
                <div
                    className="flex flex-row items-center cursor-pointer"
                    onClick={() => router.push("/")}
                >
                    <span
                        className="text-lg md:text-2xl font-black tracking-tighter"
                        style={{ fontFamily: "Inter, sans-serif", color: "#0044CC" }}
                    >
                        {logo}
                    </span>
                </div>

                {/* Navigation */}
                <nav className="hidden lg:flex flex-row items-center gap-8" aria-label="Main navigation">
                    {navigation.map((item, index) => {
                        const isActive = item.href === pathname;
                        return (
                            <button
                                key={index}
                                onClick={item.onClick}
                                className="relative flex flex-row items-center gap-1 hover:opacity-70 transition-opacity pb-1"
                                style={{
                                    fontFamily: "Inter, sans-serif",
                                    fontSize: "16px",
                                    fontWeight: isActive ? 600 : 400,
                                    color: isActive ? "#0044CC" : "#4a5568",
                                }}
                            >
                                {item.label}
                                {item.hasDropdown && (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path
                                            d="M4 6L8 10L12 6"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0044CC]"
                                        initial={false}
                                    />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Header Buttons */}
                <div className="flex flex-row items-center gap-2 md:gap-4">
                    <div className="hidden lg:flex flex-row items-center gap-4">
                        {headerButtons.map((button, index) => (
                            <button
                                key={index}
                                onClick={button.onClick}
                                className={cn(
                                    "px-4 py-2 md:px-6 md:py-2 rounded-full transition-all hover:scale-105 font-medium text-sm md:text-base",
                                    button.variant === "solid"
                                        ? "bg-[#0044CC] text-white shadow-lg"
                                        : "bg-white border border-[#0044CC] text-[#0044CC] shadow-sm hover:bg-[#f8fafc]"
                                )}
                                style={{
                                    fontFamily: "Inter, sans-serif",
                                }}
                            >
                                {button.label}
                            </button>
                        ))}
                    </div>

                    {/* Hamburger Trigger */}
                    <button
                        className="lg:hidden p-2 text-[#0044CC]"
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <MenuIcon size={28} />
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-100 bg-white flex flex-col items-center justify-center overflow-y-auto p-6"
                    >
                        <button
                            className="absolute top-8 right-8 p-2 text-[#0044CC]"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <X size={32} />
                        </button>

                        <MenuVertical
                            color="#0044CC"
                            menuItems={navigation.map(item => ({
                                label: item.label,
                                href: item.href || "#",
                                onClick: () => {
                                    if (item.onClick) item.onClick();
                                    setIsMenuOpen(false);
                                }
                            }))}
                        />

                        <div className="mt-8 flex flex-col gap-3 w-full max-w-sm">
                            {headerButtons.map((button, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        button.onClick();
                                        setIsMenuOpen(false);
                                    }}
                                    className={cn(
                                        "w-full py-3 rounded-xl font-bold text-lg transition-all",
                                        button.variant === "solid"
                                            ? "bg-[#0044CC] text-white shadow-md"
                                            : "bg-white border border-[#0044CC] text-[#0044CC]"
                                    )}
                                >
                                    {button.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
