"use client"

import { FileText, Users, Edit3, Activity } from "lucide-react"

const kpis = [
  {
    icon: FileText,
    label: "Total Articles",
    value: "1,847",
    trend: "+12.5%",
    positive: true,
    color: "bg-gradient-to-br from-slate-100 to-slate-200 text-slate-800",
  },
  {
    icon: Users,
    label: "Active Editors",
    value: "234",
    trend: "+8.2%",
    positive: true,
    color: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600",
  },
  {
    icon: Edit3,
    label: "Total Edits",
    value: "45,892",
    trend: "+15.3%",
    positive: true,
    color: "bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600",
  },
  {
    icon: Activity,
    label: "Bytes Added",
    value: "2.4M",
    trend: "+22.1%",
    positive: true,
    color: "bg-gradient-to-br from-amber-100 to-amber-200 text-amber-600",
  },
]

export default function KPISection() {
  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-800 mb-5">Summary KPIs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <div
              key={kpi.label}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${kpi.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="block text-2xl font-bold text-slate-800">{kpi.value}</span>
                <span className="text-sm text-slate-500">{kpi.label}</span>
              </div>
              <span
                className={`text-sm font-semibold px-2.5 py-1 rounded-full ${
                  kpi.positive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                }`}
              >
                {kpi.trend}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
