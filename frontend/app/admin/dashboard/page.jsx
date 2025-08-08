import { Activity, BarChart3, ClipboardList, Database, HeartHandshake, LayoutDashboard, LogOut, Shield, Users, Wrench } from "lucide-react"
import { Button } from "../../../components/ui/button"

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/admin/dashboard", active: true },
  { label: "User Management", icon: Users, href: "#" },
  { label: "NGO Management", icon: HeartHandshake, href: "#" },
  { label: "Issue Reports", icon: ClipboardList, href: "#" },
  { label: "Donations", icon: BarChart3, href: "#" },
  { label: "Content Moderation", icon: Shield, href: "#" },
  { label: "System Health", icon: Activity, href: "#" },
]

const statCards = [
  { title: "Total Users", value: "12,847", change: "+12% from last month", icon: Users },
  { title: "Active NGOs", value: "234", change: "+8% from last month", icon: HeartHandshake },
  { title: "Open Issues", value: "1,429", change: "−5% from last month", icon: ClipboardList },
  { title: "Total Donations", value: "$847,293", change: "+23% from last month", icon: BarChart3 },
]

const activities = [
  { title: "NGO Registration", desc: "Green Earth Foundation submitted verification", status: "pending", time: "2 hours ago" },
  { title: "Issue Report", desc: "Pothole reported on Main Street", status: "new", time: "4 hours ago" },
  { title: "Donation", desc: "$500 donated to Clean Water Initiative", status: "completed", time: "6 hours ago" },
  { title: "Volunteer Application", desc: "John Doe applied for Community Garden project", status: "approved", time: "8 hours ago" },
]

function Badge({ children, intent }) {
  const base = "inline-flex items-center rounded-full px-2 py-0.5 text-xs"
  const styles = {
    pending: "bg-amber-100 text-amber-800",
    new: "bg-red-100 text-red-700",
    completed: "bg-emerald-100 text-emerald-700",
    approved: "bg-sky-100 text-sky-700",
  }
  // @ts-ignore - allow string index
  const cls = styles[intent] || "bg-secondary text-secondary-foreground"
  return <span className={`${base} ${cls}`}>{children}</span>
}

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-muted/20">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-0 md:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="border-r bg-background p-4 md:sticky md:top-0 md:h-screen">
          <div className="mb-6">
            <div className="text-lg font-semibold">CommunityConnect</div>
            <div className="text-xs text-muted-foreground">Admin Dashboard</div>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition hover:bg-accent hover:text-accent-foreground ${
                  item.active ? "bg-primary/10 text-foreground" : "text-muted-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto hidden pt-8 md:block">
            <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50">
              <LogOut className="h-4 w-4" />
              Logout
            </a>
          </div>
        </aside>

        {/* Main content */}
        <main className="p-4 md:p-6 lg:p-8">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Dashboard Overview</h1>
            <p className="mt-1 text-sm text-muted-foreground">Monitor your platform's key metrics and activities</p>
          </header>

          {/* Stats */}
          <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {statCards.map((c) => (
              <div key={c.title} className="rounded-xl border bg-background p-5 shadow-sm">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{c.title}</span>
                  <c.icon className="h-4 w-4" />
                </div>
                <div className="mt-2 text-2xl font-semibold">{c.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{c.change}</div>
              </div>
            ))}
          </section>

          {/* Recent activities */}
          <section className="rounded-xl border bg-background p-4 shadow-sm">
            <div className="mb-2 text-sm font-medium">Recent Activities</div>
            <div className="text-xs text-muted-foreground mb-4">Latest platform activities requiring attention</div>
            <div className="divide-y">
              {activities.map((a, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      {a.title}
                      <Badge intent={a.status}>{a.status}</Badge>
                    </div>
                    <div className="truncate text-xs text-muted-foreground">{a.desc}</div>
                  </div>
                  <div className="whitespace-nowrap text-xs text-muted-foreground">{a.time}</div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}



