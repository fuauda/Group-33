export default function UsersPage() {
  const users = [
    { name: "John Doe", email: "john@example.com", role: "Citizen", status: "Active", joined: "2024-01-15", last: "2 hours ago" },
    { name: "Jane Smith", email: "jane@example.com", role: "Volunteer", status: "Active", joined: "2024-01-20", last: "1 day ago" },
    { name: "Mike Johnson", email: "mike@example.com", role: "Donor", status: "Inactive", joined: "2024-02-01", last: "1 week ago" },
    { name: "Sarah Wilson", email: "sarah@example.com", role: "Citizen", status: "Suspended", joined: "2024-02-10", last: "3 days ago" },
    { name: "David Brown", email: "david@example.com", role: "Volunteer", status: "Active", joined: "2024-02-15", last: "5 hours ago" },
  ]

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">User Management</h1>
      <div className="rounded-xl border bg-background p-4 shadow-sm">
        <div className="mb-3 text-sm font-medium">User Filters</div>
        <input className="mb-4 h-9 w-full rounded-md border px-3 text-sm" placeholder="Search users..." />

        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Join Date</th>
                <th className="px-4 py-3">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email} className="border-t">
                  <td className="px-4 py-3">
                    <div className="font-medium">{u.name}</div>
                    <div className="text-muted-foreground">{u.email}</div>
                  </td>
                  <td className="px-4 py-3">{u.role}</td>
                  <td className="px-4 py-3">{u.status}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{u.joined}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{u.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}



