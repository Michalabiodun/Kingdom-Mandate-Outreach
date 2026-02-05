"use client";

import Link from "next/link";
import { useState } from "react";

export default function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-solid border-[var(--glass-border)] glass-panel">
      <div className="flex items-center justify-between whitespace-nowrap px-5 py-3 md:px-8 lg:px-10">
        <div className="flex items-center text-[var(--text-main)]">
          <h2 className="text-[var(--text-main)] text-lg font-bold leading-tight tracking-[-0.015em] md:text-xl">
            Kingdom Mandate
          </h2>
        </div>
        <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
          <nav className="flex items-center gap-7 lg:gap-9">
            <Link
              className="text-[var(--text-main)] text-sm font-semibold leading-normal hover:text-[var(--accent-primary)] transition-colors"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-[var(--text-main)] text-sm font-semibold leading-normal hover:text-[var(--accent-primary)] transition-colors"
              href="/about"
            >
              About
            </Link>
            <Link
              className="text-[var(--text-main)] text-sm font-semibold leading-normal hover:text-[var(--accent-primary)] transition-colors"
              href="/events"
            >
              Events
            </Link>
            <Link
              className="text-[var(--text-main)] text-sm font-semibold leading-normal hover:text-[var(--accent-primary)] transition-colors"
              href="/support"
            >
              Support
            </Link>
            <Link
              className="text-[var(--text-main)] text-sm font-semibold leading-normal hover:text-[var(--accent-primary)] transition-colors"
              href="/contact"
            >
              Contact
            </Link>
          </nav>
          <div className="flex gap-4 items-center">
            <Link
              href="/login"
              className="flex items-center justify-center rounded-xl h-10 px-6 text-[var(--text-main)] text-sm font-bold leading-normal hover:bg-black/5 transition-all"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-accent-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:brightness-110 transition-all shadow-md"
            >
              <span className="truncate">Register / Sign Up</span>
            </Link>
          </div>
        </div>
        <button
          className="md:hidden flex items-center justify-center size-10 rounded-xl border border-white/30 text-[var(--text-main)] hover:bg-white/40 transition-colors"
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="material-symbols-outlined text-[22px]">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>
      {menuOpen ? (
        <div className="md:hidden px-5 pb-5">
          <div className="rounded-2xl border border-white/40 bg-white/70 backdrop-blur-sm shadow-[0_10px_30px_rgba(15,23,42,0.08)] p-4">
            <nav className="flex flex-col gap-4">
              <Link
                className="text-[var(--text-main)] text-base font-semibold leading-normal hover:text-[var(--accent-primary)] transition-colors"
                href="/"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                className="text-[var(--text-main)] text-base font-semibold leading-normal hover:text-[var(--accent-primary)] transition-colors"
                href="/about"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
              <Link
                className="text-[var(--text-main)] text-base font-semibold leading-normal hover:text-[var(--accent-primary)] transition-colors"
                href="/events"
                onClick={() => setMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                className="text-[var(--text-main)] text-base font-semibold leading-normal hover:text-[var(--accent-primary)] transition-colors"
                href="/support"
                onClick={() => setMenuOpen(false)}
              >
                Support
              </Link>
              <Link
                className="text-[var(--text-main)] text-base font-semibold leading-normal hover:text-[var(--accent-primary)] transition-colors"
                href="/contact"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/login"
                className="flex items-center justify-center rounded-xl h-11 px-6 text-[var(--text-main)] text-sm font-bold leading-normal border border-white/60 bg-white/80 hover:bg-white transition-all"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="flex items-center justify-center rounded-xl h-11 px-6 bg-accent-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:brightness-110 transition-all shadow-md"
                onClick={() => setMenuOpen(false)}
              >
                Register / Sign Up
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
