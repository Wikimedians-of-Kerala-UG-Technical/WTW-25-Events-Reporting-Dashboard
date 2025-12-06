"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Monthly contribution data for each project
const monthlyData = [
  { month: "Jul", wikipedia: 245, wikidata: 189, commons: 87, wikisource: 56 },
  { month: "Aug", wikipedia: 312, wikidata: 234, commons: 112, wikisource: 78 },
  { month: "Sep", wikipedia: 287, wikidata: 198, commons: 95, wikisource: 67 },
  { month: "Oct", wikipedia: 356, wikidata: 267, commons: 134, wikisource: 89 },
  { month: "Nov", wikipedia: 423, wikidata: 312, commons: 156, wikisource: 112 },
  { month: "Dec", wikipedia: 478, wikidata: 345, commons: 178, wikisource: 134 },
]

// Project distribution data
const projectDistribution = [
  { name: "Wikipedia", value: 4292, color: "#3b82f6" },
  { name: "Wikidata", value: 8750, color: "#10b981" },
  { name: "Commons", value: 1717, color: "#f59e0b" },
  { name: "Wikisource", value: 2394, color: "#8b5cf6" },
]

// Weekly edits trend
const weeklyEdits = [
  { day: "Mon", edits: 156 },
  { day: "Tue", edits: 189 },
  { day: "Wed", edits: 234 },
  { day: "Thu", edits: 212 },
  { day: "Fri", edits: 267 },
  { day: "Sat", edits: 145 },
  { day: "Sun", edits: 123 },
]

// Bytes added by project over time
const bytesData = [
  { month: "Jul", wikipedia: 456, wikidata: 123, commons: 890, wikisource: 234 },
  { month: "Aug", wikipedia: 523, wikidata: 145, commons: 1023, wikisource: 267 },
  { month: "Sep", wikipedia: 489, wikidata: 134, commons: 945, wikisource: 245 },
  { month: "Oct", wikipedia: 612, wikidata: 167, commons: 1156, wikisource: 298 },
  { month: "Nov", wikipedia: 678, wikidata: 189, commons: 1289, wikisource: 334 },
  { month: "Dec", wikipedia: 745, wikidata: 212, commons: 1378, wikisource: 367 },
]

export default function MetricsCharts() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-800">Project Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Contributions Line Chart */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-slate-700">Monthly Contributions by Project</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="wikipedia"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                    name="Wikipedia"
                  />
                  <Line
                    type="monotone"
                    dataKey="wikidata"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: "#10b981", strokeWidth: 2 }}
                    name="Wikidata"
                  />
                  <Line
                    type="monotone"
                    dataKey="commons"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ fill: "#f59e0b", strokeWidth: 2 }}
                    name="Commons"
                  />
                  <Line
                    type="monotone"
                    dataKey="wikisource"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2 }}
                    name="Wikisource"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Project Distribution Pie Chart */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-slate-700">Total Edits by Project</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={{ stroke: "#64748b" }}
                  >
                    {projectDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [value.toLocaleString() + " edits", "Total"]}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bytes Added Area Chart */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-slate-700">Content Growth (KB Added)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={bytesData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip
                    formatter={(value: number) => [value + " KB", ""]}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="commons" stackId="1" stroke="#f59e0b" fill="#fef3c7" name="Commons" />
                  <Area
                    type="monotone"
                    dataKey="wikipedia"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#dbeafe"
                    name="Wikipedia"
                  />
                  <Area
                    type="monotone"
                    dataKey="wikisource"
                    stackId="1"
                    stroke="#8b5cf6"
                    fill="#ede9fe"
                    name="Wikisource"
                  />
                  <Area
                    type="monotone"
                    dataKey="wikidata"
                    stackId="1"
                    stroke="#10b981"
                    fill="#d1fae5"
                    name="Wikidata"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Activity Bar Chart */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-slate-700">Weekly Edit Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyEdits} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="edits" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Total Edits" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Comparison Bar Chart - Full Width */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium text-slate-700">Project Metrics Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { metric: "Articles/Items", wikipedia: 312, wikidata: 876, commons: 842, wikisource: 375 },
                  { metric: "Active Editors", wikipedia: 8, wikidata: 6, commons: 5, wikisource: 4 },
                  { metric: "Avg Daily Edits", wikipedia: 68, wikidata: 125, commons: 24, wikisource: 34 },
                ]}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis type="category" dataKey="metric" tick={{ fill: "#64748b", fontSize: 12 }} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="wikipedia" fill="#3b82f6" name="Wikipedia" radius={[0, 4, 4, 0]} />
                <Bar dataKey="wikidata" fill="#10b981" name="Wikidata" radius={[0, 4, 4, 0]} />
                <Bar dataKey="commons" fill="#f59e0b" name="Commons" radius={[0, 4, 4, 0]} />
                <Bar dataKey="wikisource" fill="#8b5cf6" name="Wikisource" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
