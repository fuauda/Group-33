export default function NGOsPage() {
  const ngos = [
    { org: "Green Earth Foundation", email: "contact@greenearth.org", category: "Environment", status: "Pending", docs: 3, date: "2024-02-20" },
    { org: "Hope for Children", email: "info@hopechildren.org", category: "Education", status: "Verified", docs: 4, date: "2024-01-15" },
    { org: "Community Health Initiative", email: "admin@healthinit.org", category: "Healthcare", status: "Rejected", docs: 2, date: "2024-02-10" },
    { org: "Clean Water Project", email: "contact@cleanwater.org", category: "Infrastructure", status: "Verified", docs: 4, date: "2024-01-28" },
  ]

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">NGO Management</h1>
      <div className="rounded-xl border bg-background p-4 shadow-sm">
        <div className="mb-3 text-sm font-medium">NGO Filters</div>
        <input className="mb-4 h-9 w-full rounded-md border px-3 text-sm" placeholder="Search NGOs..." />
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Organization</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Registration Date</th>
                <th className="px-4 py-3">Documents</th>
              </tr>
            </thead>
            <tbody>
              {ngos.map((n) => (
                <tr key={n.org} className="border-t">
                  <td className="px-4 py-3">
                    <div className="font-medium">{n.org}</div>
                    <div className="text-muted-foreground">{n.email}</div>
                  </td>
                  <td className="px-4 py-3">{n.category}</td>
                  <td className="px-4 py-3">{n.status}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{n.date}</td>
                  <td className="px-4 py-3">{n.docs} documents</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}



