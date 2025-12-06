"use client"

import { useState } from "react"
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  Bell,
  Clock,
  User,
  FileText,
  Search,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const alertsData = [
  {
    id: 1,
    type: "warning",
    title: "Suspected Copyvio",
    message: 'Content in "History of Lyon" article may contain copyrighted material from external sources.',
    user: "NewEditor2024",
    article: "History of Lyon",
    project: "Wikipedia",
    timestamp: "2024-12-06 14:45",
    status: "unresolved",
  },
  {
    id: 2,
    type: "error",
    title: "Edit Conflict",
    message: "Multiple simultaneous edits detected on the same article section.",
    user: "MarieCurie2024",
    article: "Presqu'île District",
    project: "Wikipedia",
    timestamp: "2024-12-06 13:30",
    status: "unresolved",
  },
  {
    id: 3,
    type: "info",
    title: "New Editor Onboarded",
    message: "A new editor has joined the BU Lyon 3 campaign and completed orientation.",
    user: "LyonStudent_FR",
    article: null,
    project: "All",
    timestamp: "2024-12-06 12:15",
    status: "resolved",
  },
  {
    id: 4,
    type: "warning",
    title: "Large Deletion",
    message: "More than 5000 bytes were removed from an article in a single edit.",
    user: "HistoryBuff_FR",
    article: "Silk industry in Lyon",
    project: "Wikipedia",
    timestamp: "2024-12-06 11:00",
    status: "resolved",
  },
  {
    id: 5,
    type: "success",
    title: "Article Milestone",
    message: '"Lyon Fine Arts Museum" article has reached Good Article status.',
    user: "ArtHistorian",
    article: "Lyon Fine Arts Museum",
    project: "Wikipedia",
    timestamp: "2024-12-05 16:30",
    status: "resolved",
  },
  {
    id: 6,
    type: "error",
    title: "Duplicate File Upload",
    message: "File appears to be a duplicate of an existing Commons file.",
    user: "PhotoArchiver",
    article: "Lyon_Cathedral_Duplicate.jpg",
    project: "Commons",
    timestamp: "2024-12-05 14:20",
    status: "unresolved",
  },
  {
    id: 7,
    type: "info",
    title: "Weekly Report Generated",
    message: "Automated weekly contribution report has been generated for review.",
    user: "System",
    article: null,
    project: "All",
    timestamp: "2024-12-05 08:00",
    status: "resolved",
  },
  {
    id: 8,
    type: "warning",
    title: "Missing Citations",
    message: "Article contains multiple statements requiring citations.",
    user: "ScienceEditor",
    article: "Rhône River",
    project: "Wikipedia",
    timestamp: "2024-12-04 17:45",
    status: "unresolved",
  },
  {
    id: 9,
    type: "success",
    title: "Transcription Complete",
    message: '"Les Misérables/Volume 1" transcription has been verified and completed.',
    user: "TextTranscriber",
    article: "Les Misérables/Volume 1",
    project: "Wikisource",
    timestamp: "2024-12-04 15:00",
    status: "resolved",
  },
  {
    id: 10,
    type: "info",
    title: "Wikidata Item Linked",
    message: "New Wikidata item has been linked to existing Wikipedia article.",
    user: "PropertyMaster",
    article: "Q123456789",
    project: "Wikidata",
    timestamp: "2024-12-04 11:30",
    status: "resolved",
  },
  {
    id: 11,
    type: "error",
    title: "Blocked User Activity",
    message: "Edits detected from an IP range associated with previously blocked accounts.",
    user: "Anonymous IP",
    article: "Fourvière Basilica",
    project: "Wikipedia",
    timestamp: "2024-12-03 19:15",
    status: "resolved",
  },
  {
    id: 12,
    type: "warning",
    title: "Neutral Point of View",
    message: "Article content may violate neutral point of view guidelines.",
    user: "CultureVulture",
    article: "Traboules of Lyon",
    project: "Wikipedia",
    timestamp: "2024-12-03 14:00",
    status: "unresolved",
  },
]

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredAlerts = alertsData.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || alert.type === typeFilter
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const alertCounts = {
    total: alertsData.length,
    error: alertsData.filter((a) => a.type === "error").length,
    warning: alertsData.filter((a) => a.type === "warning").length,
    info: alertsData.filter((a) => a.type === "info").length,
    success: alertsData.filter((a) => a.type === "success").length,
    unresolved: alertsData.filter((a) => a.status === "unresolved").length,
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertCircle className="w-5 h-5" />
      case "warning":
        return <AlertTriangle className="w-5 h-5" />
      case "info":
        return <Info className="w-5 h-5" />
      case "success":
        return <CheckCircle className="w-5 h-5" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-50 border-red-200 text-red-700"
      case "warning":
        return "bg-amber-50 border-amber-200 text-amber-700"
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-700"
      case "success":
        return "bg-emerald-50 border-emerald-200 text-emerald-700"
      default:
        return "bg-slate-50 border-slate-200 text-slate-700"
    }
  }

  const getIconBg = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-100 text-red-600"
      case "warning":
        return "bg-amber-100 text-amber-600"
      case "info":
        return "bg-blue-100 text-blue-600"
      case "success":
        return "bg-emerald-100 text-emerald-600"
      default:
        return "bg-slate-100 text-slate-600"
    }
  }

  const getProjectColor = (project: string) => {
    switch (project) {
      case "Wikipedia":
        return "bg-blue-100 text-blue-700"
      case "Wikidata":
        return "bg-emerald-100 text-emerald-700"
      case "Commons":
        return "bg-amber-100 text-amber-700"
      case "Wikisource":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <Card className="bg-slate-50 border-slate-200">
          <CardContent className="p-4 text-center">
            <Bell className="w-6 h-6 mx-auto text-slate-500 mb-1" />
            <p className="text-2xl font-bold text-slate-700">{alertCounts.total}</p>
            <p className="text-xs text-slate-500">Total Alerts</p>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <AlertCircle className="w-6 h-6 mx-auto text-red-500 mb-1" />
            <p className="text-2xl font-bold text-red-700">{alertCounts.error}</p>
            <p className="text-xs text-red-600">Errors</p>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-6 h-6 mx-auto text-amber-500 mb-1" />
            <p className="text-2xl font-bold text-amber-700">{alertCounts.warning}</p>
            <p className="text-xs text-amber-600">Warnings</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <Info className="w-6 h-6 mx-auto text-blue-500 mb-1" />
            <p className="text-2xl font-bold text-blue-700">{alertCounts.info}</p>
            <p className="text-xs text-blue-600">Info</p>
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-6 h-6 mx-auto text-emerald-500 mb-1" />
            <p className="text-2xl font-bold text-emerald-700">{alertCounts.success}</p>
            <p className="text-xs text-emerald-600">Success</p>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 mx-auto text-orange-500 mb-1" />
            <p className="text-2xl font-bold text-orange-700">{alertCounts.unresolved}</p>
            <p className="text-xs text-orange-600">Unresolved</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={typeFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter("all")}
              >
                All Types
              </Button>
              <Button
                variant={typeFilter === "error" ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter("error")}
                className={typeFilter === "error" ? "bg-red-600 hover:bg-red-700" : ""}
              >
                Errors
              </Button>
              <Button
                variant={typeFilter === "warning" ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter("warning")}
                className={typeFilter === "warning" ? "bg-amber-600 hover:bg-amber-700" : ""}
              >
                Warnings
              </Button>
              <Button
                variant={typeFilter === "info" ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter("info")}
                className={typeFilter === "info" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                Info
              </Button>
              <Button
                variant={typeFilter === "success" ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter("success")}
                className={typeFilter === "success" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              >
                Success
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "unresolved" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("unresolved")}
                className={statusFilter === "unresolved" ? "bg-orange-600 hover:bg-orange-700" : ""}
              >
                Unresolved
              </Button>
              <Button
                variant={statusFilter === "resolved" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("resolved")}
              >
                Resolved
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className={`border-l-4 ${getAlertColor(alert.type)} hover:shadow-md transition-shadow`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconBg(alert.type)}`}>
                  {getAlertIcon(alert.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-800">{alert.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{alert.message}</p>
                    </div>
                    <Badge variant={alert.status === "unresolved" ? "destructive" : "secondary"} className="shrink-0">
                      {alert.status}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {alert.user}
                    </span>
                    {alert.article && (
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {alert.article}
                      </span>
                    )}
                    <Badge className={getProjectColor(alert.project)}>{alert.project}</Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {alert.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Bell className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">No alerts match your filters</p>
          </CardContent>
        </Card>
      )}

      {/* External Link */}
      <Card className="bg-slate-50">
        <CardContent className="p-4 flex items-center justify-between">
          <p className="text-sm text-slate-600">View all alerts on the official Outreach Dashboard</p>
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://outreachdashboard.wmflabs.org/campaigns/bu_lyon_3/alerts"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Dashboard <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
