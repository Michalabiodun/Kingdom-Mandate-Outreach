import LandingFooter from "@/components/landing/LandingFooter";
import LandingHeader from "@/components/landing/LandingHeader";

const days = Array.from({ length: 35 }, (_, index) =>
  index + 1 <= 31 ? index + 1 : null,
);

const dotDays = new Set([2, 3, 8, 10, 15]);

export default function Events() {
  return (
    <div className="min-h-screen bg-[#f5f6fb] text-[#0e121b] flex flex-col">
      <LandingHeader />
      <main className="flex-1 w-full">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl md:text-4xl font-bold">Events Calendar</h1>
            <p className="text-sm text-[#6b75a1]">October 2023</p>
          </div>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            <section className="rounded-3xl border border-[#e6e9f5] bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <button className="size-9 rounded-full border border-[#e6e9f5] text-[#7f8ac5] flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">chevron_left</span>
                  </button>
                  <p className="text-lg font-semibold">October 2023</p>
                  <button className="size-9 rounded-full border border-[#e6e9f5] text-[#7f8ac5] flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">chevron_right</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex rounded-full border border-[#e6e9f5] bg-[#f7f8ff] p-1">
                    <button className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#2f5be7] shadow-sm">
                      Month
                    </button>
                    <button className="rounded-full px-4 py-2 text-xs font-semibold text-[#8c96c7]">
                      Week
                    </button>
                    <button className="rounded-full px-4 py-2 text-xs font-semibold text-[#8c96c7]">
                      Day
                    </button>
                  </div>
                  <button className="rounded-full bg-[#2f5be7] px-4 py-2 text-xs font-semibold text-white shadow-sm">
                    Add Event
                  </button>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-[#eef0f8] bg-[#fafbff] p-4">
                <div className="grid grid-cols-7 text-center text-[11px] font-semibold text-[#9aa3c8]">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>
                <div className="mt-4 grid grid-cols-7 gap-2 text-xs text-[#a2aacb]">
                  {days.map((day, index) => (
                    <div
                      key={`${day ?? "empty"}-${index}`}
                      className={`min-h-[76px] rounded-xl border border-transparent p-2 text-left ${
                        day === 5 ? "border-[#2f5be7] bg-white shadow-sm" : ""
                      } ${day ? "bg-white/60" : "bg-transparent"}`}
                    >
                      {day ? (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#6c739a]">
                              {day}
                            </span>
                            {dotDays.has(day) && (
                              <span className="size-1.5 rounded-full bg-[#2f5be7]"></span>
                            )}
                          </div>
                          {day === 5 && (
                            <span className="rounded-md bg-[#eef1ff] px-2 py-1 text-[10px] font-semibold text-[#2f5be7]">
                              Youth Prayer
                            </span>
                          )}
                          {day === 12 && (
                            <span className="rounded-md bg-[#eef1ff] px-2 py-1 text-[10px] font-semibold text-[#2f5be7]">
                              Bible Study
                            </span>
                          )}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center text-xs text-[#a2aacb]">
                  Viewing full month...
                </div>
              </div>
            </section>
            <aside className="rounded-3xl border border-[#e6e9f5] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">Upcoming Events</h2>
                  <p className="text-xs text-[#8a92b6]">Don&#39;t miss out on what&#39;s next</p>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-4">
                <div className="rounded-2xl border border-[#eef0f8] bg-[#fafbff] p-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#e9ecff] px-3 py-1 text-[10px] font-semibold text-[#2f5be7]">
                      TODAY
                    </span>
                    <span className="text-xs text-[#7b86b2]">7:00 PM</span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold">Youth Prayer Night</h3>
                  <p className="mt-2 text-xs text-[#7b86b2]">
                    Join us for an evening of spiritual renewal and communal worship at the Main Hall.
                  </p>
                  <button className="mt-4 w-full rounded-xl bg-[#2f5be7] px-4 py-2 text-xs font-semibold text-white">
                    RSVP Now
                  </button>
                </div>
                <div className="rounded-2xl border border-[#eef0f8] bg-[#fafbff] p-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#e9ecff] px-3 py-1 text-[10px] font-semibold text-[#2f5be7]">
                      OCT 12
                    </span>
                    <span className="text-xs text-[#7b86b2]">6:30 PM</span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold">Leadership Seminar</h3>
                  <p className="mt-2 text-xs text-[#7b86b2]">
                    Developing the next generation of spiritual leaders. Workshop by Pastor John Doe.
                  </p>
                  <button className="mt-4 w-full rounded-xl bg-[#eef1ff] px-4 py-2 text-xs font-semibold text-[#2f5be7]">
                    View Details
                  </button>
                </div>
                <div className="rounded-2xl border border-[#eef0f8] bg-[#fafbff] p-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#e9ecff] px-3 py-1 text-[10px] font-semibold text-[#2f5be7]">
                      OCT 15
                    </span>
                    <span className="text-xs text-[#7b86b2]">9:00 AM</span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold">Community Outreach</h3>
                  <p className="mt-2 text-xs text-[#7b86b2]">
                    Distributing supplies to our neighborhood families in need.
                  </p>
                  <button className="mt-4 w-full rounded-xl bg-[#eef1ff] px-4 py-2 text-xs font-semibold text-[#2f5be7]">
                    Sign Up
                  </button>
                </div>
              </div>
              <button className="mt-6 w-full rounded-xl border border-[#eef0f8] px-4 py-3 text-xs font-semibold text-[#2f5be7]">
                See All Events →
              </button>
            </aside>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
