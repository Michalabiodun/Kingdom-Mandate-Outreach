"use client";

 import Link from "next/link";
 import { useRouter } from "next/navigation";
 import { useEffect, useState, useSyncExternalStore } from "react";
 import DashboardHeader from "@/components/dashboard/dashboard-header";
 import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";

 const transcriptItems = [
   {
     time: "00:00 - 01:12",
     text:
       "In this opening session, we will establish why leadership is the cornerstone of territorial dominion. The mandate starts with you.",
   },
   {
     time: "01:13 - 02:48",
     text:
       "Many people seek power before they seek alignment. In the Kingdom, power is a result of structural integrity within your spirit man.",
     active: true,
   },
   {
     time: "02:46 - 04:10",
     text:
       "Let us turn our Bibles to the book of Nehemiah. Nehemiah understood that broken walls were a reflection of broken leadership.",
   },
   {
     time: "04:11 - 06:15",
     text:
       "Spiritual authority is not loud, it is weighted. It is the result of seasons spent in the secret place with the Father.",
   },
   {
     time: "06:16 - 08:45",
     text:
       "The heart of a servant is the engine of a leader. If you cannot serve those beneath you, you are not qualified to lead those before you.",
   },
   {
     time: "08:46 - 11:20",
     text:
       "Character is the currency of longevity. Many finish well because they built deep before they built wide.",
   },
 ];

 const relatedSermons = [
   {
     title: "Dimensions of Spiritual Growth",
     speaker: "Dr. Joshua Selman",
     date: "Sep 15, 2023",
     duration: "52:14",
     image:
       "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
   },
   {
     title: "Laws of Kingdom Economy",
     speaker: "Pastor Enoch Adeboye",
     date: "Aug 22, 2023",
     duration: "45:08",
     image:
       "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
   },
   {
     title: "The Altar of Prayer",
     speaker: "Apostle Michael Oropko",
     date: "Oct 15, 2023",
     duration: "39:40",
     image:
       "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
   },
   {
     title: "Renewal of the Mind",
     speaker: "Dr. Myles Munroe",
     date: "Oct 05, 2023",
     duration: "58:46",
     image:
       "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
   },
 ];

 export default function SermonsPage() {
   const router = useRouter();
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(true);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";

   const subscribe = (callback: () => void) => {
     if (typeof window === "undefined") {
       return () => {};
     }
     const handler = () => callback();
     window.addEventListener("storage", handler);
     window.addEventListener("km-session", handler);
     return () => {
       window.removeEventListener("storage", handler);
       window.removeEventListener("km-session", handler);
     };
   };

   const rawUser = useSyncExternalStore(
     subscribe,
     () => sessionStorage.getItem("km-auth"),
     () => null,
   );

  const rawToken = useSyncExternalStore(
    subscribe,
    () => sessionStorage.getItem("km-token"),
    () => null,
  );

   const onboardingFlag = useSyncExternalStore(
     subscribe,
     () => sessionStorage.getItem("km-onboarding"),
     () => null,
   );

   useEffect(() => {
    if (!rawUser || !rawToken) {
       router.replace("/login");
     }
  }, [rawUser, rawToken, router]);

  useEffect(() => {
    let isActive = true;
    const verify = async () => {
      if (!rawUser || !rawToken) {
        return;
      }
      try {
        const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
          headers: { Authorization: `Bearer ${rawToken}` },
        });
        if (!response.ok) {
          if (response.status === 401) {
            const refreshResponse = await fetch(`${apiBaseUrl}/api/auth/refresh`, {
              method: "POST",
              credentials: "include",
            });
            const refreshPayload = (await refreshResponse.json()) as { token?: string };
            if (!refreshResponse.ok || !refreshPayload.token) {
              throw new Error("Unauthorized");
            }
            sessionStorage.setItem("km-token", refreshPayload.token);
            const retry = await fetch(`${apiBaseUrl}/api/auth/me`, {
              headers: { Authorization: `Bearer ${refreshPayload.token}` },
            });
            if (!retry.ok) {
              throw new Error("Unauthorized");
            }
          } else {
            throw new Error("Unauthorized");
          }
        }
        if (isActive) {
          setIsAuthReady(true);
        }
      } catch (error) {
        sessionStorage.removeItem("km-auth");
        sessionStorage.removeItem("km-token");
        sessionStorage.removeItem("km-onboarding");
        sessionStorage.removeItem("km-preferences");
        window.dispatchEvent(new Event("km-session"));
        router.replace("/login");
      }
    };
    verify();
    return () => {
      isActive = false;
    };
  }, [apiBaseUrl, rawToken, rawUser, router]);

  if (!rawUser || !isAuthReady) {
     return <div className="min-h-screen bg-[#f4f7fb]" />;
   }

   let userName = "Leader";
   let userRole = "Member";

   try {
     const parsed = JSON.parse(rawUser) as { name?: string; role?: string };
     userName = parsed.name || "Leader";
     userRole = parsed.role || "Member";
   } catch {
     userName = "Leader";
     userRole = "Member";
   }

  const handleLogout = () => {
    setIsSidebarOpen(false);
    fetch(`${apiBaseUrl}/api/auth/logout`, { method: "POST", credentials: "include" });
    sessionStorage.removeItem("km-auth");
    sessionStorage.removeItem("km-token");
    sessionStorage.removeItem("km-onboarding");
    sessionStorage.removeItem("km-preferences");
    window.dispatchEvent(new Event("km-session"));
    router.push("/login");
  };

   if (onboardingFlag === "true") {
     return (
       <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center px-6 py-12">
         <div className="w-full max-w-[720px] rounded-[32px] bg-white border border-[#e6e9f5] shadow-[0_30px_80px_rgba(28,38,74,0.18)] px-10 py-12">
           <div className="text-center">
             <p className="text-xs font-semibold tracking-[0.24em] text-[#8fa1b6] uppercase">
               Onboarding
             </p>
             <h1 className="mt-4 text-3xl md:text-4xl font-bold text-[#0f172a]">
               Welcome, {userName}
             </h1>
             <p className="mt-3 text-sm md:text-base text-[#6370a6]">
               Let us personalize your leadership journey before you enter the dashboard.
             </p>
           </div>
           <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="rounded-2xl border border-[#e8ebf3] bg-[#f8faff] p-5">
               <p className="text-xs font-semibold text-[#2f5be7]">Step 1</p>
               <h3 className="mt-2 text-lg font-bold text-[#0e121b]">Profile Setup</h3>
               <p className="mt-2 text-sm text-[#5b6b83]">
                 Confirm your name, ministry focus, and leadership role.
               </p>
             </div>
             <div className="rounded-2xl border border-[#e8ebf3] bg-white p-5">
               <p className="text-xs font-semibold text-[#2f5be7]">Step 2</p>
               <h3 className="mt-2 text-lg font-bold text-[#0e121b]">Choose a Track</h3>
               <p className="mt-2 text-sm text-[#5b6b83]">
                 Select a leadership path tailored to your calling.
               </p>
             </div>
             <div className="rounded-2xl border border-[#e8ebf3] bg-[#f8faff] p-5">
               <p className="text-xs font-semibold text-[#2f5be7]">Step 3</p>
               <h3 className="mt-2 text-lg font-bold text-[#0e121b]">Set Goals</h3>
               <p className="mt-2 text-sm text-[#5b6b83]">
                 Define outcomes for discipleship, mentorship, and growth.
               </p>
             </div>
           </div>
           <div className="mt-10 flex flex-col sm:flex-row gap-4">
             <button
               className="flex-1 h-12 rounded-xl border border-[#e8ebf3] text-sm font-semibold text-[#1f2a44] hover:bg-[#f7f9fc]"
               onClick={() => {
                 sessionStorage.setItem("km-onboarding", "false");
                 window.dispatchEvent(new Event("km-session"));
               }}
             >
               Skip for Now
             </button>
             <button
               className="flex-1 h-12 rounded-xl bg-[#2f5be7] text-white text-sm font-semibold hover:brightness-110"
               onClick={() => {
                 sessionStorage.setItem("km-onboarding", "false");
                 window.dispatchEvent(new Event("km-session"));
               }}
             >
               Continue to Dashboard
             </button>
           </div>
         </div>
       </div>
     );
   }

  return (
    <div className="min-h-screen flex bg-[#f4f7fb] text-[#0e121b]">
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col lg:pl-[280px]">
        <DashboardHeader
          onOpenSidebar={() => setIsSidebarOpen(true)}
          searchPlaceholder="Search sermons..."
          userName={userName}
          userRole={userRole}
        />
        <main className="flex-1 px-4 pb-5 pt-24 md:px-6 md:pb-6 lg:px-10 lg:pb-8">
           <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_0.9fr]">
             <div className="flex flex-col gap-6">
               <div className="text-xs font-semibold text-[#8fa1b6] flex items-center gap-2">
                 <Link className="hover:text-[#2f5be7]" href="/dashboard">
                   Home
                 </Link>
                 <span>/</span>
                 <Link className="hover:text-[#2f5be7]" href="/dashboard/sermons">
                   Sermons
                 </Link>
                 <span>/</span>
                 <span className="text-[#2f5be7]">Principles of Kingdom Leadership</span>
               </div>
              <section className="rounded-3xl border border-[#e8ebf3] bg-white p-4 md:p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1">
                 <div className="relative w-full overflow-hidden rounded-2xl border border-[#e6ebf3] bg-[#0f172a] aspect-video">
                   <div
                     className="absolute inset-0 bg-cover bg-center"
                     style={{
                       backgroundImage:
                         'url("https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop")',
                     }}
                   />
                   <div className="absolute inset-0 bg-black/40" />
                   <button className="absolute inset-0 m-auto size-14 rounded-full bg-white/90 text-[#2f5be7] flex items-center justify-center">
                     <span className="material-symbols-outlined text-3xl">play_arrow</span>
                   </button>
                   <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                     <div className="flex items-center gap-2">
                       <button className="size-8 rounded-full bg-white/10 flex items-center justify-center">
                         <span className="material-symbols-outlined text-base">volume_up</span>
                       </button>
                       <div className="h-1 flex-1 rounded-full bg-white/20">
                         <div className="h-1 w-[45%] rounded-full bg-white" />
                       </div>
                     </div>
                     <span className="text-[10px] font-semibold">12:45 / 48:22</span>
                   </div>
                 </div>
                 <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                   <div>
                     <h1 className="text-2xl md:text-3xl font-bold text-[#0e121b]">
                       Principles of Kingdom Leadership
                     </h1>
                     <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#5b6b83]">
                       <span className="flex items-center gap-2">
                         <span className="material-symbols-outlined text-sm">person</span>
                         Dr. Joshua Selman
                       </span>
                       <span className="flex items-center gap-2">
                         <span className="material-symbols-outlined text-sm">calendar_month</span>
                         Oct 24, 2023
                       </span>
                     </div>
                   </div>
                   <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                     <button className="w-full sm:w-auto rounded-xl border border-[#d7e2ff] bg-[#eef3ff] px-5 py-2 text-sm font-semibold text-[#2f5be7]">
                       Audio MP3
                     </button>
                     <button className="w-full sm:w-auto rounded-xl border border-[#d7e2ff] bg-[#eef3ff] px-5 py-2 text-sm font-semibold text-[#2f5be7]">
                       Transcript
                     </button>
                   </div>
                 </div>
                 <div className="mt-6 rounded-2xl border border-[#e8ebf3] bg-[#f8faff] p-5">
                   <h2 className="text-sm font-bold text-[#0e121b]">Sermon Notes</h2>
                   <p className="mt-2 text-sm text-[#5b6b83] leading-relaxed">
                     Exploring the foundational pillars of leadership within the context of
                     God’s Kingdom. This session focuses on the heart of a servant leader and
                     the spiritual authority granted through alignment. Dr. Selman delivers the
                     three dimensions of influence: character, competence, and connection.
                   </p>
                 </div>
               </section>
               <section className="rounded-3xl border border-[#e8ebf3] bg-white p-5 md:p-6">
                 <div className="flex items-center justify-between">
                   <h2 className="text-lg font-bold text-[#0e121b]">Related Sermons</h2>
                   <div className="flex items-center gap-2">
                     <button className="size-9 rounded-full border border-[#e8ebf3] text-[#5b6b83] flex items-center justify-center">
                       <span className="material-symbols-outlined text-base">chevron_left</span>
                     </button>
                     <button className="size-9 rounded-full border border-[#e8ebf3] text-[#5b6b83] flex items-center justify-center">
                       <span className="material-symbols-outlined text-base">chevron_right</span>
                     </button>
                   </div>
                 </div>
                 <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                   {relatedSermons.map((sermon) => (
                    <div
                      className="rounded-2xl border border-[#e8ebf3] bg-[#f8faff] overflow-hidden transition-transform duration-200 hover:-translate-y-1"
                      key={sermon.title}
                    >
                       <div className="relative h-32">
                         <div
                           className="absolute inset-0 bg-cover bg-center"
                           style={{ backgroundImage: `url(${sermon.image})` }}
                         />
                         <div className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-1 text-[10px] font-semibold text-white">
                           {sermon.duration}
                         </div>
                       </div>
                       <div className="p-4">
                         <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8fa1b6]">
                           Spiritual Growth
                         </p>
                         <h3 className="mt-2 text-sm font-bold text-[#0e121b]">
                           {sermon.title}
                         </h3>
                         <p className="mt-2 text-xs text-[#5b6b83]">
                           {sermon.speaker} · {sermon.date}
                         </p>
                       </div>
                     </div>
                   ))}
                 </div>
               </section>
             </div>
            <aside className="rounded-3xl border border-[#e8ebf3] bg-white p-5 md:p-6 h-fit transition-transform duration-200 hover:-translate-y-1">
               <div className="flex items-center justify-between">
                 <h2 className="text-lg font-bold text-[#0e121b]">Sermon Transcript</h2>
                 <span className="rounded-full bg-[#e9f0ff] px-3 py-1 text-[10px] font-semibold text-[#2f5be7]">
                   Live
                 </span>
               </div>
              <div className="mt-4 flex items-center gap-3 rounded-full border border-[#e8ebf3] bg-[#f7f9fc] px-4 py-2 focus-within:border-[#2f5be7] focus-within:ring-2 focus-within:ring-[#2f5be7]/20">
                 <span className="material-symbols-outlined text-[#8fa1b6] text-base">
                   search
                 </span>
                 <input
                   className="w-full bg-transparent text-sm text-[#1f2a44] outline-none"
                   placeholder="Search in transcript..."
                   type="text"
                 />
               </div>
               <div className="mt-4 flex flex-col gap-3 max-h-[520px] overflow-y-auto pr-1">
                 {transcriptItems.map((item) => (
                  <div
                    className={`rounded-2xl border px-4 py-3 text-sm transition-transform duration-200 hover:-translate-y-1 ${
                      item.active
                        ? "border-[#cdd9ff] bg-[#eef3ff] text-[#1f2a44]"
                        : "border-[#eef1f6] bg-[#fafbff] text-[#5b6b83]"
                    }`}
                    key={item.time}
                  >
                     <p className="text-[10px] font-semibold text-[#2f5be7]">{item.time}</p>
                     <p className="mt-2 leading-relaxed">{item.text}</p>
                   </div>
                 ))}
               </div>
             </aside>
           </div>
         </main>
      </div>
      {isComingSoonOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10">
          <div
            className="absolute inset-0 bg-[#0f172a]/60"
            onClick={() => setIsComingSoonOpen(false)}
          />
          <div className="relative w-full max-w-lg rounded-3xl border border-[#e5e7f2] bg-white px-6 py-8 shadow-[0_30px_80px_rgba(15,23,42,0.25)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.24em] text-[#8fa1b6] uppercase">
                  Sermons
                </p>
                <h2 className="mt-3 text-2xl font-bold text-[#0f172a]">
                  Coming Soon
                </h2>
                <p className="mt-2 text-sm text-[#6370a6]">
                  Fresh sermon content is on the way. Check back soon for updates.
                </p>
              </div>
              <button
                className="size-10 rounded-full border border-[#e8ebf3] text-[#5b6b83] flex items-center justify-center"
                onClick={() => setIsComingSoonOpen(false)}
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                className="h-11 rounded-xl border border-[#e8ebf3] px-4 text-sm font-semibold text-[#1f2a44] hover:bg-[#f7f9fc]"
                onClick={() => setIsComingSoonOpen(false)}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      ) : null}
     </div>
   );
 }
