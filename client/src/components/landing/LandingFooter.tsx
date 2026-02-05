export default function LandingFooter() {
  return (
    <footer className="mt-20 w-full glass-panel border-t border-white/40">
      <div className="max-w-[1280px] mx-auto px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
        <div className="flex flex-col gap-5 md:gap-6">
          <div className="flex items-center gap-3">
            <div className="size-8 text-[var(--accent-primary)]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight">Kingdom Mandate</span>
          </div>
          <p className="text-[var(--text-muted)] text-xs md:text-sm leading-relaxed">
            A global ministry focused on raising leaders who establish God's kingdom values in
            every sphere of society.
          </p>
          <div className="flex gap-3 md:gap-4">
            <a
              className="size-9 md:size-10 rounded-full glass-panel flex items-center justify-center text-[var(--accent-primary)] hover:bg-accent-primary hover:text-white transition-all"
              href="#"
            >
              <span className="material-symbols-outlined text-lg md:text-xl">public</span>
            </a>
            <a
              className="size-9 md:size-10 rounded-full glass-panel flex items-center justify-center text-[var(--accent-primary)] hover:bg-accent-primary hover:text-white transition-all"
              href="#"
            >
              <span className="material-symbols-outlined text-lg md:text-xl">video_library</span>
            </a>
            <a
              className="size-9 md:size-10 rounded-full glass-panel flex items-center justify-center text-[var(--accent-primary)] hover:bg-accent-primary hover:text-white transition-all"
              href="#"
            >
              <span className="material-symbols-outlined text-lg md:text-xl">share</span>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 md:contents">
          <div className="flex flex-col gap-4 md:gap-6">
            <h4 className="font-bold text-base md:text-lg">Quick Links</h4>
            <nav className="flex flex-col gap-2 md:gap-3 text-xs md:text-sm">
              <a
                className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                href="#"
              >
                Terms of Service
              </a>
              <a
                className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                href="#"
              >
                Privacy Policy
              </a>
              <a
                className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                href="#"
              >
                Sitemap
              </a>
              <a
                className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                href="#"
              >
                Cookie Policy
              </a>
              <a
                className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                href="#"
              >
                Leadership Blog
              </a>
            </nav>
          </div>
          <div className="flex flex-col gap-4 md:gap-6">
            <h4 className="font-bold text-base md:text-lg">Resources</h4>
            <nav className="flex flex-col gap-2 md:gap-3 text-xs md:text-sm">
              <a
                className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                href="#"
              >
                Media Library
              </a>
              <a
                className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                href="#"
              >
                Daily Devotional
              </a>
              <a
                className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                href="#"
              >
                Prayer Network
              </a>
              <a
                className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                href="#"
              >
                Leadership Academy
              </a>
              <a
                className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                href="#"
              >
                Youth Outreach
              </a>
            </nav>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-6">
          <h4 className="font-bold text-base md:text-lg">Contact Us</h4>
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[var(--accent-primary)] text-lg md:text-xl">
                mail
              </span>
              <div>
                <p className="text-[10px] md:text-xs font-bold text-[var(--text-muted)]">Email</p>
                <p className="text-xs md:text-sm">connect@kingdommandate.org</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[var(--accent-primary)] text-lg md:text-xl">
                call
              </span>
              <div>
                <p className="text-[10px] md:text-xs font-bold text-[var(--text-muted)]">Phone</p>
                <p className="text-xs md:text-sm">+1 (800) KINGDOM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[var(--accent-primary)] text-lg md:text-xl">
                location_on
              </span>
              <div>
                <p className="text-[10px] md:text-xs font-bold text-[var(--text-muted)]">Address</p>
                <p className="text-xs md:text-sm">777 Kingdom Way, Grace City, GC 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20 py-8 text-center text-[var(--text-muted)] text-xs md:text-sm">
        <p>© 2024 Kingdom Mandate Global. Empowering spiritual leaders globally. All rights reserved.</p>
      </div>
    </footer>
  );
}
