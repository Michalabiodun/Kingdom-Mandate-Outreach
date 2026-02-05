import LandingFooter from "@/components/landing/LandingFooter";
import LandingHeader from "@/components/landing/LandingHeader";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#f4f6fb] text-[#0e121b] flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        <section className="px-6 md:px-10 pt-12 pb-8">
          <div className="max-w-[1000px] mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#111827]">
              Connect With Us
            </h1>
            <p className="mt-3 text-sm md:text-base text-[#6b7280]">
              Our team is here to support your spiritual leadership journey.
            </p>
          </div>
        </section>
        <section className="px-6 md:px-10 pb-16">
          <div className="max-w-[1200px] mx-auto">
            <div className="rounded-3xl bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)] border border-[#e5e7f2] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr]">
                <div className="bg-[#f8f9fe] p-8 md:p-10 flex flex-col gap-8">
                  <div>
                    <h2 className="text-lg font-bold text-[#1f3cff]">Get in Touch</h2>
                    <p className="mt-2 text-sm text-[#6b7280]">
                      We would love to hear from you. Reach out anytime.
                    </p>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="flex items-start gap-4">
                      <div className="size-10 rounded-xl bg-[#e8edff] text-[#1f3cff] flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">
                          location_on
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#111827]">Our Location</p>
                        <p className="text-sm text-[#6b7280]">
                          123 Ministry Way, Leadership City, State 54321
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="size-10 rounded-xl bg-[#e8edff] text-[#1f3cff] flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">
                          call
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#111827]">Phone Support</p>
                        <p className="text-sm text-[#6b7280]">+1 (555) 000-0000</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="size-10 rounded-xl bg-[#e8edff] text-[#1f3cff] flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">
                          mail
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#111827]">Email Us</p>
                        <p className="text-sm text-[#6b7280]">contact@kingdommandate.org</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-[#e5e7f2] bg-white p-4">
                    <div className="h-40 rounded-xl bg-[radial-gradient(circle_at_center,_#e2e8f0,_#f8fafc)] flex items-center justify-center">
                      <div className="size-12 rounded-full bg-[#1f3cff] text-white flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined">location_on</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-10">
                  <h2 className="text-lg font-bold text-[#111827]">Send a Message</h2>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                    <label className="text-xs font-semibold text-[#6b7280] flex flex-col gap-2">
                      FULL NAME
                      <input
                        className="h-12 rounded-xl border border-[#e5e7f2] px-4 text-sm text-[#111827] placeholder:text-[#9ca3af] focus:border-[#1f3cff] focus:outline-none"
                        placeholder="John Doe"
                        type="text"
                      />
                    </label>
                    <label className="text-xs font-semibold text-[#6b7280] flex flex-col gap-2">
                      EMAIL ADDRESS
                      <input
                        className="h-12 rounded-xl border border-[#e5e7f2] px-4 text-sm text-[#111827] placeholder:text-[#9ca3af] focus:border-[#1f3cff] focus:outline-none"
                        placeholder="john@example.com"
                        type="email"
                      />
                    </label>
                  </div>
                  <label className="mt-5 text-xs font-semibold text-[#6b7280] flex flex-col gap-2">
                    SUBJECT
                    <input
                      className="h-12 rounded-xl border border-[#e5e7f2] px-4 text-sm text-[#111827] placeholder:text-[#9ca3af] focus:border-[#1f3cff] focus:outline-none"
                      placeholder="General Inquiry"
                      type="text"
                    />
                  </label>
                  <label className="mt-5 text-xs font-semibold text-[#6b7280] flex flex-col gap-2">
                    MESSAGE
                    <textarea
                      className="min-h-[130px] rounded-xl border border-[#e5e7f2] px-4 py-3 text-sm text-[#111827] placeholder:text-[#9ca3af] focus:border-[#1f3cff] focus:outline-none"
                      placeholder="How can we help you?"
                    />
                  </label>
                  <button className="mt-6 w-full h-12 rounded-xl bg-[#1f3cff] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(31,60,255,0.25)] hover:brightness-110 transition-all">
                    <span className="material-symbols-outlined text-base">send</span>
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
