const amounts = ["$10", "$50", "$100", "Custom"];

export default function Support() {
  return (
    <div className="min-h-screen bg-[#eef2fb] text-[#0e121b] flex flex-col flex-1 items-center justify-center p-6 py-12">
      <div className="w-full max-w-[520px] rounded-[32px] bg-white shadow-[0_30px_80px_rgba(28,38,74,0.18)] border border-[#e6e9f5] px-10 py-12">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
            Support the Ministry
          </h1>
          <p className="mt-3 text-sm text-[#6370a6]">
            Empowering leaders to change the world through spiritual growth.
          </p>
        </div>
        <div className="mt-8">
          <p className="text-xs font-semibold text-[#343f6b]">Select Amount</p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {amounts.map((amount) => (
              <button
                key={amount}
                className={`h-11 rounded-xl text-sm font-semibold ${amount === "$50"
                    ? "border-2 border-[#2f5be7] text-[#2f5be7] bg-white"
                    : "border border-[#e6e9f5] text-[#0f172a] bg-[#f4f6fb]"
                  }`}
              >
                {amount}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <label className="text-xs font-semibold text-[#343f6b]">
            Name on Card
            <input
              className="mt-2 w-full rounded-xl border border-[#cfd6ea] bg-white px-4 py-3 text-sm text-[#0f172a] placeholder:text-[#9aa3c8]"
              placeholder="Full name as it appears"
              type="text"
            />
          </label>
          <label className="text-xs font-semibold text-[#343f6b]">
            Card Information
            <div className="mt-2 flex items-center rounded-xl border border-[#cfd6ea] bg-white px-4 py-3">
              <input
                className="flex-1 text-sm text-[#0f172a] placeholder:text-[#9aa3c8] outline-none"
                placeholder="0000 0000 0000 0000"
                type="text"
              />
              <div className="ml-3 size-5 text-[#5b6ab3]">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                  <rect x="4" y="9" width="16" height="2" rx="1" className="fill-white"></rect>
                  <rect x="4" y="13" width="7" height="2" rx="1" className="fill-white"></rect>
                </svg>
              </div>
            </div>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs font-semibold text-[#343f6b]">
              MM/YY
              <input
                className="mt-2 w-full rounded-xl border border-[#cfd6ea] bg-white px-4 py-3 text-sm text-[#0f172a] placeholder:text-[#9aa3c8]"
                placeholder="MM/YY"
                type="text"
              />
            </label>
            <label className="text-xs font-semibold text-[#343f6b]">
              CVC
              <input
                className="mt-2 w-full rounded-xl border border-[#cfd6ea] bg-white px-4 py-3 text-sm text-[#0f172a] placeholder:text-[#9aa3c8]"
                placeholder="CVC"
                type="text"
              />
            </label>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#f5f7fe] px-4 py-3">
          <div>
            <p className="text-xs font-semibold text-[#343f6b]">Monthly Recurring</p>
            <p className="text-[11px] text-[#7d88b7]">Automate your faithful support</p>
          </div>
          <div className="h-6 w-12 rounded-full bg-[#d3d8ec] p-1">
            <div className="h-4 w-4 rounded-full bg-white"></div>
          </div>
        </div>
        <button className="mt-6 w-full rounded-2xl bg-white py-3 text-sm font-semibold text-[#0f172a] shadow-[0_12px_30px_rgba(28,38,74,0.1)] border border-[#e6e9f5]">
          Donate Now 💙
        </button>
        <div className="mt-6 flex items-center justify-center gap-6 text-[10px] text-[#9aa3c8]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xs">lock</span>
            SSL SECURE
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xs">verified_user</span>
            PCI COMPLIANT
          </div>
        </div>
      </div>
    </div>
  );
}
