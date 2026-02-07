import Image from "next/image";
import Link from "next/link";

const team = [
  {
    name: "Dr. Samuel Kingsley",
    role: "SENIOR PASTOR",
    bio: "Dr. Kingsley has served the ministry for over 20 years with a heart for global missions and theological education.",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYW5wuJq2Q6-5yFchB1Mjx5taseof-dU-qtUAs4NfpHLqvdirZrJPaPyd_VuD7JfK-7gx5uBdE98bWttKfDZeOXxFV_43eOVGiBwJ8574aFMIwqxXXvpZjZ9HofSK-0piY19TzwV5qiPz-6vsCqBDFh5tJqvMxZHSA6y3Zd73vU7F89eq6gvTBO0DiySY7B0N6TAXsbbphqvOQaxLJkf1mOJJnmko4sFb7nHO9pRoz13XA6EZTtXZrS2f4-QnWS7_8zNrqo7-fkM0y",
  },
  {
    name: "Sarah Mitchell",
    role: "DIRECTOR OF OPERATIONS",
    bio: "Sarah oversees daily administrative functions with grace and professional excellence, ensuring organizational integrity.",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB5lO8KX3AJLXzbKlzU0zhGIHdPQbsC3Ax0aBVvwyJxv52_RPmeWTsAjvELIz6gy7i66vF9qO04IHiDmzxi5oCTVg7l7g5s8IKvMHWfkTk3nnbIrejCbwznQjD47U2JJ3nbjzl0DzpMK3Pv8BWlIGIG7ZWDPhv3zkBFti28nFCV56-11-9IMqnSDlbTNx4ERz1kmAduy3RFfVvQbDf9eNLu04SGa1l4nKHBrY1Xk8fVi1aM_I3CSLr9bmbmbHZnKeecTW48cS3U0Z0z",
  },
  {
    name: "David Chen",
    role: "WORSHIP LEADER",
    bio: "David leads our congregation in authentic and powerful worship experiences, blending traditional and modern styles.",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVj0p9F9Ov9b1rt4G0mbgVwnNtZgZJ4TrKXPPDln_AAISbgzpJpc4gsFYpgHoLfYkE_XGBm-bJkjJ973pBBnGoozwAI1Ku5UOaF5X54bK_EceFy9C0ZmoPZnml1YHExoNvpSFJMudO_fDdyMJMyG0gjx4ksVEZYU_UoSH7GncilhaxzuShiCU7DV0rW7oXHAT4M1YCi3dQusfM5ESrDbfULxmiIyLzZZUAi0HInNM3WELsrASp9Q9XuK_ZYgqBpBZ6Xle1lh0JoTiV",
  },
  {
    name: "Rev. James Wilson",
    role: "SPIRITUAL ADVISOR",
    bio: "James provides theological guidance and intentional mentorship to emerging leaders and ministry students.",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBC9jNbwii6LxnKJhYveAngLjW7T5IYeh2Z97Ck7Ldsr1BVjs3tfDrIe78g1IpVIbNUXaBb0EAAEmkrzB1RNBEnlqkBVLPurKMVxnx36MYzG_Eoyt73FYjXGoe8Py__1p2uA63z5Q8ZnKx9QnN6kqpxV1f73gzTwkB9ex_VCNhmouJ26ZjIDBIt7AWj7cuURUNrI1LhSvMdlafxGWo_5I9UHdNNr_XlfRExFLQDwVRwzkv0CoQORw0Fc3TbtQANXTWgIZCl2sXx5Lxk",
  },
  {
    name: "Maria Rodriguez",
    role: "COMMUNITY OUTREACH",
    bio: "Maria connects our ministry with local community needs and global initiatives, fostering a spirit of service.",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYW5wuJq2Q6-5yFchB1Mjx5taseof-dU-qtUAs4NfpHLqvdirZrJPaPyd_VuD7JfK-7gx5uBdE98bWttKfDZeOXxFV_43eOVGiBwJ8574aFMIwqxXXvpZjZ9HofSK-0piY19TzwV5qiPz-6vsCqBDFh5tJqvMxZHSA6y3Zd73vU7F89eq6gvTBO0DiySY7B0N6TAXsbbphqvOQaxLJkf1mOJJnmko4sFb7nHO9pRoz13XA6EZTtXZrS2f4-QnWS7_8zNrqo7-fkM0y",
  },
  {
    name: "Jonathan Pierce",
    role: "YOUTH MINISTRY LEAD",
    bio: "Jonathan is passionate about building strong spiritual foundations for youth through engagement and outreach.",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVj0p9F9Ov9b1rt4G0mbgVwnNtZgZJ4TrKXPPDln_AAISbgzpJpc4gsFYpgHoLfYkE_XGBm-bJkjJ973pBBnGoozwAI1Ku5UOaF5X54bK_EceFy9C0ZmoPZnml1YHExoNvpSFJMudO_fDdyMJMyG0gjx4ksVEZYU_UoSH7GncilhaxzuShiCU7DV0rW7oXHAT4M1YCi3dQusfM5ESrDbfULxmiIyLzZZUAi0HInNM3WELsrASp9Q9XuK_ZYgqBpBZ6Xle1lh0JoTiV",
  },
];

export default function About() {
  return (
    <div className="flex flex-col flex-1">
      <section className="w-full max-w-[1280px] mx-auto px-6 md:px-10 py-10 md:py-16">
        <div className="glass-panel rounded-3xl p-6 md:p-10 lg:p-14 text-center shadow-2xl">
          <span className="text-(--accent-primary) font-bold tracking-widest uppercase text-xs md:text-sm">
            Our Purpose
          </span>
          <h1 className="mt-3 md:mt-4 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-(--text-main)">
            Our Mission
          </h1>
          <p className="mt-4 md:mt-6 text-(--text-muted) text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Kingdom Mandate is dedicated to fostering spiritual maturity and leadership excellence through a biblical foundation and modern ministry approach. We exist to empower individuals to fulfill their divine calling and equip the next generation of spiritual leaders for global impact.
          </p>
        </div>
      </section>

      <section className="w-full max-w-[1280px] mx-auto px-6 md:px-10 py-8 md:py-12">
        <div className="flex flex-col items-center gap-2 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-(--text-main)">
            Leadership Ministry Team
          </h2>
          <div className="h-1 w-20 bg-(--accent-primary) rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {team.map((member) => (
            <div key={member.name} className="glass-panel rounded-2xl p-6 flex flex-col gap-4 transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="size-16 md:size-20 rounded-full border-2 border-(--accent-primary) overflow-hidden">
                  <Image
                    alt={member.name}
                    className="h-full w-full object-cover"
                    src={member.photo}
                    width={80}
                    height={80}
                    sizes="(max-width: 768px) 64px, 80px"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-(--accent-primary) font-extrabold text-base md:text-lg">
                    {member.name}
                  </h3>
                  <p className="text-(--text-muted) text-xs md:text-sm font-semibold">
                    {member.role}
                  </p>
                </div>
              </div>
              <p className="text-(--text-muted) text-sm leading-relaxed">
                {member.bio}
              </p>
              <div className="flex items-center justify-between pt-2">
                <Link href="/dashboard" className="text-(--accent-primary) font-bold text-sm hover:underline">
                  Read More
                </Link>
                <div className="flex items-center gap-3 text-(--text-muted)">
                  <span className="material-symbols-outlined text-base">share</span>
                  <span className="material-symbols-outlined text-base">visibility</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1280px] mx-auto px-6 md:px-10 py-10 md:py-16">
        <div className="glass-panel rounded-2xl p-8 md:p-12 text-center border border-white/50">
          <h3 className="text-xl md:text-2xl font-black text-(--text-main)">
            Want to join our mission?
          </h3>
          <p className="mt-2 md:mt-3 text-(--text-muted) max-w-2xl mx-auto">
            We are always looking for dedicated individuals to serve in our various ministry teams.
          </p>
          <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard"
              className="flex min-w-[160px] md:min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 md:h-14 px-6 bg-(--accent-primary) text-white text-sm md:text-lg font-bold hover:brightness-110 transition-all shadow-md"
            >
              Get Involved
            </Link>
            <Link
              href="/contact"
              className="flex min-w-[160px] md:min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 md:h-14 px-6 bg-white text-(--accent-primary) border-2 border-(--accent-primary) text-sm md:text-lg font-bold hover:bg-white/60 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
