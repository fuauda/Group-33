import { Activity, BarChart3, ClipboardList, HeartHandshake, LayoutDashboard, LogOut, Shield, Users } from "lucide-react"


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
      <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
        {/* Main content */}
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
      </div>
    </div>
  )
}
 