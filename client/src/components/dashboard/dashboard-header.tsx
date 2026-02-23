"use client";

import Link from "next/link";

interface DashboardHeaderProps {
  onOpenSidebar: () => void;
  searchPlaceholder: string;
  userName: string;
  userRole: string;
}

export default function DashboardHeader({
  onOpenSidebar,
  searchPlaceholder,
  userName,
  userRole,
}: DashboardHeaderProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex flex-col gap-4 border-b border-[#e8ebf3] bg-white px-4 py-4 md:px-6 md:flex-row md:items-center md:justify-between md:gap-6 lg:left-[280px]">
      <div className="flex items-center gap-3 w-full md:max-w-2xl">
        <button
          className="size-10 rounded-xl bg-[#2f5be7] text-white flex items-center justify-center lg:hidden"
          onClick={onOpenSidebar}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="flex items-center gap-3 w-full rounded-full border border-[#e8ebf3] bg-[#f7f9fc] px-4 py-2 focus-within:border-[#2f5be7] focus-within:ring-2 focus-within:ring-[#2f5be7]/20">
          <span className="material-symbols-outlined text-[#8fa1b6] text-base">search</span>
          <input
            className="w-full bg-transparent text-sm text-[#1f2a44] outline-none"
            placeholder={searchPlaceholder}
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 md:gap-4">
        <button className="hidden md:flex size-10 rounded-full border border-[#e8ebf3] text-[#5b6b83] items-center justify-center">
          <span className="material-symbols-outlined text-base">notifications</span>
        </button>
        <button className="hidden md:flex size-10 rounded-full border border-[#e8ebf3] text-[#5b6b83] items-center justify-center">
          <span className="material-symbols-outlined text-base">chat_bubble</span>
        </button>
        <Link
          href="/dashboard/profile"
          className="hidden md:flex items-center gap-3 border-l border-[#e8ebf3] pl-4"
        >
          <div className="text-right">
            <p className="text-sm font-bold text-[#1f2a44]">{userName}</p>
            <p className="text-xs text-[#5b6b83]">{userRole}</p>
          </div>
          <div className="size-10 rounded-full bg-[#2f5be7] text-white flex items-center justify-center">
            <span className="material-symbols-outlined">person</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
