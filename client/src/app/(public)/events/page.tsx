"use client";

import CalendarPdfSection from "@/components/events/calendar-pdf-section";
const calendarPdfUrls = ["/assets/calendar.pdf"];

export default function Events() {
  return (
    <div className="min-h-screen bg-[#f5f6fb] text-[#0e121b] flex flex-col flex-1">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10 w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl md:text-4xl font-bold">Events Calendar</h1>
          <p className="text-sm text-[#6b75a1]">October 2023</p>
        </div>
        <div className="mt-8">
          <CalendarPdfSection pdfUrls={calendarPdfUrls} />
        </div>
      </div>
    </div>
  );
}
