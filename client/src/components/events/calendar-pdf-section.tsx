"use client";

interface CalendarPdfSectionProps {
  pdfUrls: string[];
  className?: string;
}

export default function CalendarPdfSection({ pdfUrls, className }: CalendarPdfSectionProps) {
  return (
    <section className={`rounded-3xl border border-[#e6e9f5] bg-white p-6 shadow-sm ${className ?? ""}`}>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#0f172a]">Events PDFs</h2>
          <p className="text-xs text-[#8a92b6]">View and download the latest event calendar.</p>
        </div>
        {pdfUrls.length ? (
          <div className="flex items-center gap-3">
            <a
              className="rounded-full border border-[#e6e9f5] bg-white px-4 py-2 text-xs font-semibold text-[#2f5be7] hover:bg-[#f7f8ff]"
              href={pdfUrls[0]}
              target="_blank"
              rel="noreferrer"
            >
              Open in new tab
            </a>
            <a
              className="rounded-full bg-[#2f5be7] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:brightness-110"
              href={pdfUrls[0]}
              download
            >
              Download PDF
            </a>
          </div>
        ) : null}
      </div>
      <div className="mt-6 space-y-4">
        {pdfUrls.length ? (
          pdfUrls.map((pdfUrl) => {
            const name = pdfUrl.split("/").pop() || "Event PDF";
            return (
              <div className="rounded-2xl border border-[#eef0f8] bg-[#fafbff] p-4" key={pdfUrl}>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#8a92b6]">{name}</p>
                    <p className="text-[11px] text-[#9aa3c8]">Scroll inside the viewer or open the file in a new tab.</p>
                  </div>
                  <a
                    className="text-xs font-semibold text-[#2f5be7] hover:underline"
                    href={pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open PDF
                  </a>
                </div>
                <div className="mt-4 overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white">
                  <iframe className="h-[640px] w-full" src={pdfUrl} title={name} />
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-[#e2e8f0] bg-[#f8faff] px-6 py-12 text-center">
            <p className="text-sm font-semibold text-[#8a92b6]">Add PDF files to the list to display them here.</p>
            <p className="mt-2 text-xs text-[#b0b9d6]">Place PDFs in public/assets and update the list above.</p>
          </div>
        )}
      </div>
    </section>
  );
}
