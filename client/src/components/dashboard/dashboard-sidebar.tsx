"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const navItems = [
  { href: "/dashboard", label: "Home", icon: "home" },
  { href: "/dashboard/courses", label: "Courses / Library", icon: "menu_book" },
  { href: "/dashboard/calendar", label: "Calendar/Events", icon: "calendar_month" },
  { href: "/dashboard/prayer-requests", label: "Prayer Requests", icon: "volunteer_activism" },
  { href: "/dashboard/one-on-one", label: "One-on-One Booking", icon: "schedule" },
  { href: "/dashboard/testimonies", label: "Testimonies", icon: "auto_stories" },
  { href: "/dashboard/sermons", label: "Sermons", icon: "mic" },
];

export default function DashboardSidebar({ isOpen, onClose, onLogout }: DashboardSidebarProps) {
  const pathname = usePathname();
  const activeLinkClass =
    "flex items-center gap-3 rounded-xl bg-[#2f5be7] text-white px-4 py-3 text-sm font-semibold";
  const defaultLinkClass =
    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]";

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] flex-col border-r border-[#e8ebf3] bg-white shadow-xl transition-transform lg:hidden overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Link href="/" className="flex items-center gap-3" onClick={onClose}>
            <div className="size-10 rounded-xl bg-[#2f5be7] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">dashboard</span>
            </div>
            <div>
              <p className="text-base font-bold">Kingdom Mandate</p>
              <p className="text-xs font-semibold text-[#2f5be7] uppercase tracking-widest">
                Leadership Hub
              </p>
            </div>
          </Link>
          <button
            className="size-10 rounded-full border border-[#e8ebf3] text-[#5b6b83] flex items-center justify-center"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? activeLinkClass : defaultLinkClass}
              onClick={onClose}
            >
              <span className="material-symbols-outlined text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-4 pb-6">
          <div className="border-t border-[#e8ebf3] pt-5">
            <Link
              href="/dashboard/profile"
              className={pathname === "/dashboard/profile" ? activeLinkClass : defaultLinkClass}
              onClick={onClose}
            >
              <span className="material-symbols-outlined text-lg">settings</span>
              Settings
            </Link>
            <button
              className="mt-4 w-full rounded-xl border border-[#e8ebf3] px-4 py-3 text-sm font-semibold text-[#1f2a44] hover:bg-[#f7f9fc]"
              onClick={onLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      </aside>
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-20 w-[280px] flex-col border-r border-[#e8ebf3] bg-white overflow-y-auto">
        <Link href="/" className="flex items-center gap-3 px-6 py-6">
          <div className="size-10 rounded-xl bg-[#2f5be7] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">dashboard</span>
          </div>
          <div>
            <p className="text-base font-bold">Kingdom Mandate</p>
            <p className="text-xs font-semibold text-[#2f5be7] uppercase tracking-widest">
              Leadership Hub
            </p>
          </div>
        </Link>
        <nav className="flex flex-col gap-1 px-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? activeLinkClass : defaultLinkClass}
            >
              <span className="material-symbols-outlined text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-4 pb-6">
          <div className="border-t border-[#e8ebf3] pt-5">
            <Link
              href="/dashboard/profile"
              className={pathname === "/dashboard/profile" ? activeLinkClass : defaultLinkClass}
            >
              <span className="material-symbols-outlined text-lg">settings</span>
              Settings
            </Link>
            <button
              className="mt-4 w-full rounded-xl border border-[#e8ebf3] px-4 py-3 text-sm font-semibold text-[#1f2a44] hover:bg-[#f7f9fc]"
              onClick={onLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
