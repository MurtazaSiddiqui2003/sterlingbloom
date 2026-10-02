import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../../lib/admin-auth";

const stats = [
  { label: "New inquiries", value: "—", note: "MongoDB connection pending" },
  { label: "Upcoming events", value: "—", note: "Event management coming next" },
  { label: "Portfolio items", value: "—", note: "Cloudinary connection pending" },
  { label: "Client stories", value: "—", note: "Verified testimonials only" },
];

const modules = [
  {
    title: "Inquiries",
    description: "Review consultation requests, contact details, event types, and follow-up status.",
    status: "Next",
  },
  {
    title: "Portfolio",
    description: "Upload, categorize, feature, and remove event imagery through Cloudinary.",
    status: "Next",
  },
  {
    title: "Events & Clients",
    description: "Keep client and event details organized without editing website code.",
    status: "Planned",
  },
  {
    title: "Content",
    description: "Manage packages, services, and verified client stories from one place.",
    status: "Planned",
  },
];

export default async function AdminDashboard() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#F8F7F4] text-[#211d19]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#B68A35]">
              Sterling Bloom
            </p>
            <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-medium">
              Admin Portal
            </h1>
          </div>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="rounded-[10px] border border-gray-200 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-gray-600 transition hover:border-[#B68A35] hover:text-[#B68A35]"
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div>
          <p className="eyebrow">DASHBOARD</p>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-medium sm:text-5xl">
            Your event business, in one place.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            The admin foundation is live. The next steps connect real inquiries,
            portfolio media, clients, and events to the services you are preparing.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-[18px] border border-gray-200 bg-white p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400">
                {stat.label}
              </p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[#B68A35]">
                {stat.value}
              </p>
              <p className="mt-2 text-xs leading-5 text-gray-400">{stat.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#B68A35]">
                WORKSPACE
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-medium">
                Management Modules
              </h3>
            </div>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {modules.map((module) => (
              <article
                key={module.title}
                className="rounded-[20px] border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5 sm:p-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-[family-name:var(--font-display)] text-2xl font-medium">
                    {module.title}
                  </h4>
                  <span className="rounded-full border border-[#D6B56D] px-3 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-[#B68A35]">
                    {module.status}
                  </span>
                </div>
                <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
                  {module.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
