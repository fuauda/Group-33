export default function IssuesPage() {
  const issues = [
    { title: "Pothole on Main Street", location: "Main Street, Downtown", category: "Infrastructure", priority: "High", status: "Open", upvotes: 23, comments: 5, date: "2024-02-20" },
    { title: "Broken Street Light", location: "Oak Avenue & 5th Street", category: "Safety", priority: "Medium", status: "In Progress", upvotes: 15, comments: 3, date: "2024-02-18" },
    { title: "Illegal Dumping", location: "Central Park, North Entrance", category: "Environment", priority: "High", status: "Open", upvotes: 31, comments: 8, date: "2024-02-19" },
    { title: "Water Leak", location: "Pine Street & 2nd Avenue", category: "Infrastructure", priority: "Critical", status: "Resolved", upvotes: 42, comments: 12, date: "2024-02-15" },
  ]

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Issue Reports</h1>
      <div className="rounded-xl border bg-background p-4 shadow-sm">
        <div className="mb-3 text-sm font-medium">Issue Filters</div>
        <input className="mb-4 h-9 w-full rounded-md border px-3 text-sm" placeholder="Search issues..." />
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Issue</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Engagement</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((i) => (
                <tr key={i.title} className="border-t">
                  <td className="px-4 py-3">
                    <div className="font-medium">{i.title}</div>
                    <div className="text-muted-foreground">{i.location}</div>
                  </td>
                  <td className="px-4 py-3">{i.category}</td>
                  <td className="px-4 py-3">{i.priority}</td>
                  <td className="px-4 py-3">{i.status}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{i.upvotes} upvotes<br />{i.comments} comments</td>
                  <td className="px-4 py-3 whitespace-nowrap">{i.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}



