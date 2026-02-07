"use client";

import React from "react";
import { motion } from "framer-motion";

export const BouncyCardsFeatures = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-12 text-slate-800">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:px-8">
                <h2 className="max-w-lg text-4xl font-bold md:text-5xl">
                    Empowering believers with
                    <span className="text-slate-400"> comprehensive ministry tools</span>
                </h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="whitespace-nowrap rounded-lg bg-[#0044CC] px-4 py-2 font-medium text-white shadow-xl transition-colors hover:bg-[#0033aa]"
                >
                    Explore All Features
                </motion.button>
            </div>
            <div className="mb-4 grid grid-cols-12 gap-4">
                <BounceCard className="col-span-12 md:col-span-4">
                    <CardTitle>Spiritual Leadership</CardTitle>
                    <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-linear-to-br from-violet-400 to-indigo-400 p-4 transition-transform duration-250 group-hover:translate-y-4 group-hover:rotate-2">
                        <span className="block text-center font-semibold text-indigo-50">
                            Develop leaders who operate with spiritual authority and integrity in every sphere of influence
                        </span>
                    </div>
                </BounceCard>
                <BounceCard className="col-span-12 md:col-span-8">
                    <CardTitle>Community Outreach</CardTitle>
                    <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-linear-to-br from-amber-400 to-orange-400 p-4 transition-transform duration-250 group-hover:translate-y-4 group-hover:rotate-2">
                        <span className="block text-center font-semibold text-orange-50">
                            Transform communities through service, worship, and practical demonstration of God's love
                        </span>
                    </div>
                </BounceCard>
            </div>
            <div className="grid grid-cols-12 gap-4">
                <BounceCard className="col-span-12 md:col-span-8">
                    <CardTitle>Biblical Teaching</CardTitle>
                    <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-linear-to-br from-green-400 to-emerald-400 p-4 transition-transform duration-250 group-hover:translate-y-4 group-hover:rotate-2">
                        <span className="block text-center font-semibold text-emerald-50">
                            Deep, practical teachings that bring God's Word alive in everyday life and decision-making
                        </span>
                    </div>
                </BounceCard>
                <BounceCard className="col-span-12 md:col-span-4">
                    <CardTitle>Prayer Ministry</CardTitle>
                    <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-linear-to-br from-pink-400 to-red-400 p-4 transition-transform duration-250 group-hover:translate-y-4 group-hover:rotate-2">
                        <span className="block text-center font-semibold text-red-50">
                            Intercession and prayer support for individuals, families, and communities worldwide
                        </span>
                    </div>
                </BounceCard>
            </div>
        </section>
    );
};

interface BounceCardProps {
    className?: string;
    children: React.ReactNode;
}

const BounceCard: React.FC<BounceCardProps> = ({ className, children }) => {
    return (
        <motion.div
            whileHover={{ scale: 0.95, rotate: "-1deg" }}
            className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-slate-100 p-8 ${className}`}
        >
            {children}
        </motion.div>
    );
};

interface CardTitleProps {
    children: React.ReactNode;
}

const CardTitle: React.FC<CardTitleProps> = ({ children }) => {
    return (
        <h3 className="mx-auto text-center text-3xl font-semibold">{children}</h3>
    );
};
