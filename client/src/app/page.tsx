import Image from "next/image";
import LandingFooter from "@/components/landing/LandingFooter";
import LandingHeader from "@/components/landing/LandingHeader";

export default function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden font-sans">
      <LandingHeader />
      <main className="flex flex-col items-center flex-1 w-full">
        <section className="w-full max-w-[1280px] px-10 py-10">
          <div className="@container">
            <div
              className="relative flex min-h-[520px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-3xl items-center justify-center p-8 overflow-hidden shadow-2xl border border-white/20"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(240, 244, 248, 0.4) 0%, rgba(217, 226, 236, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuB5lO8KX3AJLXzbKlzU0zhGIHdPQbsC3Ax0aBVvwyJxv52_RPmeWTsAjvELIz6gy7i66vF9qO04IHiDmzxi5oCTVg7l7g5s8IKvMHWfkTk3nnbIrejCbwznQjD47U2JJ3nbjzl0DzpMK3Pv8BWlIGIG7ZWDPhv3zkBFti28nFCV56-11-9IMqnSDlbTNx4ERz1kmAduy3RFfVvQbDf9eNLu04SGa1l4nKHBrY1Xk8fVi1aM_I3CSLr9bmbmbHZnKeecTW48cS3U0Z0z")',
              }}
            >
              <div className="glass-panel p-12 rounded-3xl max-w-[800px] text-center flex flex-col items-center gap-8">
                <h1 className="text-[var(--text-main)] text-4xl font-black leading-tight tracking-[-0.033em] md:text-6xl">
                  Raising Kingdom Leaders. Establishing God’s Mandate on Earth.
                </h1>
                <p className="text-[var(--text-muted)] text-lg max-w-xl">
                  Empowering believers to lead with spiritual authority and
                  integrity in every sphere of influence.
                </p>
                <div className="flex-wrap gap-4 flex justify-center">
                  <button className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 bg-accent-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:scale-105 transition-transform shadow-xl">
                    <span className="truncate">Join Us</span>
                  </button>
                  <button className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 border-2 border-[var(--accent-primary)] text-[var(--accent-primary)] bg-white/20 backdrop-blur-sm text-base font-bold leading-normal tracking-[0.015em] hover:bg-white/40 transition-colors">
                    <span className="truncate">Learn More</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full max-w-[1280px] px-10 py-12">
          <h2 className="text-[var(--text-main)] text-3xl font-bold leading-tight tracking-[-0.015em] pb-8">
            Featured Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-panel flex flex-col gap-6 rounded-3xl p-6 transition-transform hover:-translate-y-2">
              <div
                className="w-full h-48 bg-center bg-no-repeat bg-cover rounded-2xl border border-white/30"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDYW5wuJq2Q6-5yFchB1Mjx5taseof-dU-qtUAs4NfpHLqvdirZrJPaPyd_VuD7JfK-7gx5uBdE98bWttKfDZeOXxFV_43eOVGiBwJ8574aFMIwqxXXvpZjZ9HofSK-0piY19TzwV5qiPz-6vsCqBDFh5tJqvMxZHSA6y3Zd73vU7F89eq6gvTBO0DiySY7B0N6TAXsbbphqvOQaxLJkf1mOJJnmko4sFb7nHO9pRoz13XA6EZTtXZrS2f4-QnWS7_8zNrqo7-fkM0y")',
                }}
              ></div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[var(--text-main)] text-xl font-bold leading-tight">
                    Recent Sermons
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm font-normal leading-relaxed">
                    Explore our latest teachings to deepen your faith and
                    understanding of God's word.
                  </p>
                </div>
                <button className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-accent-primary text-white text-sm font-bold leading-normal w-fit">
                  <span>View Sermons</span>
                </button>
              </div>
            </div>
            <div className="glass-panel flex flex-col gap-6 rounded-3xl p-6 transition-transform hover:-translate-y-2">
              <div
                className="w-full h-48 bg-center bg-no-repeat bg-cover rounded-2xl border border-white/30"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBC9jNbwii6LxnKJhYveAngLjW7T5IYeh2Z97Ck7Ldsr1BVjs3tfDrIe78g1IpVIbNUXaBb0EAAEmkrzB1RNBEnlqkBVLPurKMVxnx36MYzG_Eoyt73FYjXGoe8Py__1p2uA63z5Q8ZnKx9QnN6kqpxV1f73gzTwkB9ex_VCNhmouJ26ZjIDBIt7AWj7cuURUNrI1LhSvMdlafxGWo_5I9UHdNNr_XlfRExFLQDwVRwzkv0CoQORw0Fc3TbtQANXTWgIZCl2sXx5Lxk")',
                }}
              ></div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[var(--text-main)] text-xl font-bold leading-tight">
                    Upcoming Events
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm font-normal leading-relaxed">
                    Stay informed about our upcoming conferences and gatherings
                    designed to inspire.
                  </p>
                </div>
                <button className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-accent-primary text-white text-sm font-bold leading-normal w-fit">
                  <span>View Events</span>
                </button>
              </div>
            </div>
            <div className="glass-panel flex flex-col gap-6 rounded-3xl p-6 transition-transform hover:-translate-y-2">
              <div
                className="w-full h-48 bg-center bg-no-repeat bg-cover rounded-2xl border border-white/30"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBVj0p9F9Ov9b1rt4G0mbgVwnNtZgZJ4TrKXPPDln_AAISbgzpJpc4gsFYpgHoLfYkE_XGBm-bJkjJ973pBBnGoozwAI1Ku5UOaF5X54bK_EceFy9C0ZmoPZnml1YHExoNvpSFJMudO_fDdyMJMyG0gjx4ksVEZYU_UoSH7GncilhaxzuShiCU7DV0rW7oXHAT4M1YCi3dQusfM5ESrDbfULxmiIyLzZZUAi0HInNM3WELsrASp9Q9XuK_ZYgqBpBZ6Xle1lh0JoTiV")',
                }}
              ></div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[var(--text-main)] text-xl font-bold leading-tight">
                    Prayer Requests
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm font-normal leading-relaxed">
                    Submit your prayer requests and join our community in
                    praying for one another.
                  </p>
                </div>
                <button className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-[var(--accent-secondary)] text-white text-sm font-bold leading-normal w-fit">
                  <span>Submit Request</span>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full max-w-[1280px] px-10 py-16">
          <div className="glass-panel rounded-[2rem] overflow-hidden flex flex-col md:flex-row items-center gap-12 p-8 md:p-16 border-r-4 border-r-[var(--accent-primary)]">
            <div className="flex-1 flex flex-col gap-6">
              <span className="text-[var(--accent-primary)] font-bold tracking-widest uppercase text-sm">
                Our Calling
              </span>
              <h2 className="text-4xl font-bold leading-tight">
                Empowering Leaders for the Modern World
              </h2>
              <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                Kingdom Mandate is dedicated to the restoration of spiritual
                leadership. We provide a platform where the word of God meets
                practical leadership development, equipping believers to impact
                their communities, workplaces, and families with divine wisdom
                and integrity.
              </p>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[var(--accent-primary)]">
                    verified_user
                  </span>
                  <span className="font-medium">
                    Ethical Governance & Spiritual Integrity
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[var(--accent-primary)]">
                    groups
                  </span>
                  <span className="font-medium">
                    Community Transformation through Service
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[var(--accent-primary)]">
                    school
                  </span>
                  <span className="font-medium">
                    Strategic Discipleship & Mentorship
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 aspect-[4/3]">
                <Image
                  alt="Ministry Leadership"
                  className="object-cover scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYW5wuJq2Q6-5yFchB1Mjx5taseof-dU-qtUAs4NfpHLqvdirZrJPaPyd_VuD7JfK-7gx5uBdE98bWttKfDZeOXxFV_43eOVGiBwJ8574aFMIwqxXXvpZjZ9HofSK-0piY19TzwV5qiPz-6vsCqBDFh5tJqvMxZHSA6y3Zd73vU7F89eq6gvTBO0DiySY7B0N6TAXsbbphqvOQaxLJkf1mOJJnmko4sFb7nHO9pRoz13XA6EZTtXZrS2f4-QnWS7_8zNrqo7-fkM0y"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full max-w-[1280px] px-10 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Voices of Transformation</h2>
            <p className="text-[var(--text-muted)]">
              Real stories from our global community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-3xl flex flex-col gap-4 relative">
              <span className="material-symbols-outlined text-4xl text-[var(--accent-primary)]/30 absolute top-4 right-4">
                format_quote
              </span>
              <p className="italic text-[var(--text-muted)] leading-relaxed relative z-10">
                "The leadership training at Kingdom Mandate transformed my
                approach to business. I now lead with a sense of purpose and
                divine stewardship."
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="size-12 rounded-full bg-accent-primary/20 flex items-center justify-center font-bold text-[var(--accent-primary)]">
                  JD
                </div>
                <div>
                  <p className="font-bold text-sm">John Doe</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    CEO, Tech Solutions
                  </p>
                </div>
              </div>
            </div>
            <div className="glass-panel p-8 rounded-3xl flex flex-col gap-4 relative bg-white/80 border-t-4 border-t-[var(--accent-primary)]">
              <span className="material-symbols-outlined text-4xl text-[var(--accent-primary)]/30 absolute top-4 right-4">
                format_quote
              </span>
              <p className="italic text-[var(--text-muted)] leading-relaxed relative z-10">
                "I found a community that truly supports my spiritual growth.
                The sermons are practical and life-changing for my family."
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="size-12 rounded-full bg-accent-primary/20 flex items-center justify-center font-bold text-[var(--accent-primary)]">
                  SA
                </div>
                <div>
                  <p className="font-bold text-sm">Sarah Adams</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Community Leader
                  </p>
                </div>
              </div>
            </div>
            <div className="glass-panel p-8 rounded-3xl flex flex-col gap-4 relative">
              <span className="material-symbols-outlined text-4xl text-[var(--accent-primary)]/30 absolute top-4 right-4">
                format_quote
              </span>
              <p className="italic text-[var(--text-muted)] leading-relaxed relative z-10">
                "The mentorship program helped me discover my mandate. I am now
                actively serving in our youth ministry with confidence."
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="size-12 rounded-full bg-accent-primary/20 flex items-center justify-center font-bold text-[var(--accent-primary)]">
                  MW
                </div>
                <div>
                  <p className="font-bold text-sm">Michael Wright</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Youth Mentor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full max-w-[1280px] px-10 py-16">
          <div className="glass-panel bg-white/40 rounded-[3rem] p-12 text-center flex flex-col items-center gap-8 border-2 border-white/50 shadow-2xl">
            <div className="size-20 bg-accent-primary rounded-full flex items-center justify-center text-white mb-2">
              <span className="material-symbols-outlined text-4xl">
                volunteer_activism
              </span>
            </div>
            <h2 className="text-4xl font-black text-[var(--text-main)]">
              Support Our Global Mission
            </h2>
            <p className="text-[var(--text-muted)] text-xl max-w-2xl">
              Your generous support enables us to reach more lives, build
              leadership centers, and spread the gospel to the ends of the
              earth. Partner with us today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center">
              <button className="flex w-full sm:w-auto min-w-0 sm:min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-14 sm:h-16 px-6 sm:px-8 bg-accent-primary text-white text-base sm:text-lg font-bold hover:scale-105 transition-all shadow-lg">
                <span className="truncate">Donate Now</span>
              </button>
              <button className="flex w-full sm:w-auto min-w-0 sm:min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-14 sm:h-16 px-6 sm:px-8 bg-white text-[var(--accent-primary)] border-2 border-[var(--accent-primary)] text-base sm:text-lg font-bold hover:bg-white/60 transition-all">
                <span className="truncate">Become a Partner</span>
              </button>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
