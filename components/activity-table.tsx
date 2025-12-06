"use client"

import { mockData } from "@/lib/mock-data"

interface ActivityTableProps {
  dateRange: { from: string; to: string }
}

export default function ActivityTable({ dateRange }: ActivityTableProps) {
  const filteredActivity = mockData.recentActivity.filter((activity) => {
    const activityDate = activity.timestamp.split(" ")[0]
    return activityDate >= dateRange.from && activityDate <= dateRange.to
  })

  const formatBytes = (bytes: number) => {
    const absBytes = Math.abs(bytes)
    if (absBytes >= 1000000) return (bytes / 1000000).toFixed(1) + "M"
    if (absBytes >= 1000) return (bytes / 1000).toFixed(1) + "K"
    return bytes.toString()
  }

  const getProjectBadgeClass = (project: string) => {
    const classes: Record<string, string> = {
      Wikipedia: "bg-slate-100 text-slate-800",
      Wikidata: "bg-emerald-100 text-emerald-700",
      Commons: "bg-sky-100 text-sky-700",
      Wikisource: "bg-orange-100 text-orange-700",
    }
    return classes[project] || "bg-slate-100 text-slate-800"
  }

  const getActionBadgeClass = (action: string) => {
    const classes: Record<string, string> = {
      edit: "bg-blue-100 text-blue-700",
      create: "bg-emerald-100 text-emerald-700",
      upload: "bg-amber-100 text-amber-700",
    }
    return classes[action] || "bg-slate-100 text-slate-700"
  }

  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-800 mb-5">Recent Activity</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Editor
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Article/Item
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Bytes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredActivity.map((activity, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-slate-600">{activity.timestamp}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-800">{activity.editor}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${getProjectBadgeClass(activity.project)}`}
                    >
                      {activity.project}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getActionBadgeClass(activity.action)}`}
                    >
                      {activity.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{activity.article}</td>
                  <td
                    className={`px-4 py-3 text-sm font-semibold ${activity.bytes >= 0 ? "text-emerald-600" : "text-red-600"}`}
                  >
                    {activity.bytes >= 0 ? "+" : ""}
                    {formatBytes(activity.bytes)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
