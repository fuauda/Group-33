"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { Activity, ClipboardList, HeartHandshake, LayoutDashboard, LogOut, Menu, Shield, Users, BarChart3, Server } from "lucide-react"

function NavItem({ href, label, icon: Icon, active, collapsed }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition hover:bg-accent hover:text-accent-foreground ${
        active ? "bg-primary/10 text-foreground" : "text-muted-foreground"
      }`}
      title={collapsed ? label : undefined}
    >
      <Icon className="h-4 w-4" />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  )
}

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const navItems = useMemo(
    () => [
      { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
      { href: "/admin/users", label: "User Management", icon: Users },
      { href: "/admin/ngos", label: "NGO Management", icon: HeartHandshake },
      { href: "/admin/issues", label: "Issue Reports", icon: ClipboardList },
      { href: "/admin/donations", label: "Donations", icon: BarChart3 },
      { href: "/admin/moderation", label: "Content Moderation", icon: Shield },
      { href: "/admin/health", label: "System Health", icon: Activity },
    ],
    []
  )

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        {/* Sidebar left */}
        <aside
          className="border-r bg-background p-3 md:p-4"
          style={{ width: collapsed ? 64 : 260 }}
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            {!collapsed && (
              <div>
                <div className="text-lg font-semibold leading-tight">CommunityConnect</div>
                <div className="text-xs text-muted-foreground">Admin Dashboard</div>
              </div>
            )}
            <button
              aria-label="Toggle sidebar"
              onClick={() => setCollapsed((v) => !v)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                active={pathname === item.href}
                collapsed={collapsed}
              />
            ))}
          </nav>

          <div className="mt-auto hidden pt-8 md:block">
            <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50">
              <LogOut className="h-4 w-4" />
              {!collapsed && <span>Logout</span>}
            </a>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}



