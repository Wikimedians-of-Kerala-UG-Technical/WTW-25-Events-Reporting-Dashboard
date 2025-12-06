"use client"

import { useState } from "react"
import { ChevronLeft, Search, BookOpen, Database, ImageIcon, FileText, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockData } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

interface ProjectPageProps {
  project: "wikipedia" | "wikidata" | "commons" | "wikisource" | "all"
  onBack: () => void
}

const projectConfig = {
  wikipedia: {
    name: "Wikipedia Events Dashboard",
    description: "Encyclopedia articles and contributions",
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    badgeColor: "bg-blue-500",
    kpis: [
      { label: "Articles Created", value: "892" },
      { label: "Active Editors", value: "156" },
      { label: "Total Edits", value: "23,456" },
      { label: "Bytes Added", value: "1.2M" },
    ],
  },
  wikidata: {
    name: "Wikidata Events Dashboard",
    description: "Structured data items and properties",
    icon: Database,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    badgeColor: "bg-emerald-500",
    kpis: [
      { label: "Items Created", value: "534" },
      { label: "Active Editors", value: "89" },
      { label: "Total Edits", value: "12,789" },
      { label: "Bytes Added", value: "456K" },
    ],
  },
  commons: {
    name: "Wikimedia Commons Events Dashboard",
    description: "Media files and uploads",
    icon: ImageIcon,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    badgeColor: "bg-amber-500",
    kpis: [
      { label: "Files Uploaded", value: "287" },
      { label: "Active Editors", value: "67" },
      { label: "Total Uploads", value: "5,234" },
      { label: "Bytes Added", value: "580K" },
    ],
  },
  wikisource: {
    name: "Wikisource Events Dashboard",
    description: "Source texts and transcriptions",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    badgeColor: "bg-purple-500",
    kpis: [
      { label: "Pages Transcribed", value: "134" },
      { label: "Active Editors", value: "45" },
      { label: "Total Edits", value: "4,413" },
      { label: "Bytes Added", value: "189K" },
    ],
  },
  all: {
    name: "All Editors Overview",
    description: "Contributors across all Wikimedia projects",
    icon: Users,
    color: "text-slate-600",
    bgColor: "bg-slate-100",
    badgeColor: "bg-slate-500",
    kpis: [
      { label: "Total Editors", value: "23" },
      { label: "Total Edits", value: "45,892" },
      { label: "Content Created", value: "1,847" },
      { label: "Bytes Added", value: "2.4M" },
    ],
  },
}

export default function ProjectPage({ project, onBack }: ProjectPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [projectFilter, setProjectFilter] = useState<string>("all")

  const config = projectConfig[project]
  const Icon = config.icon

  const getAllEditors = () => {
    if (project !== "all") {
      return mockData.editors[project] || []
    }

    const allEditors: Array<{
      id: number
      username: string
      edits: number
      bytesAdded: number
      joinDate: string
      project: string
      articlesCreated?: number
      itemsCreated?: number
      filesUploaded?: number
      pagesTranscribed?: number
    }> = []

    const seenUsernames = new Set<string>()

    const projects = ["wikipedia", "wikidata", "commons", "wikisource"] as const
    projects.forEach((proj) => {
      mockData.editors[proj].forEach((editor) => {
        if (!seenUsernames.has(editor.username)) {
          seenUsernames.add(editor.username)
          allEditors.push({ ...editor, project: proj })
        }
      })
    })

    return allEditors.sort((a, b) => b.edits - a.edits)
  }

  const editors = getAllEditors()

  const filteredEditors = editors.filter((editor) => {
    const matchesSearch = editor.username.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProject = project !== "all" || projectFilter === "all" || (editor as any).project === projectFilter
    return matchesSearch && matchesProject
  })

  const getInitials = (username: string) => {
    const parts = username
      .replace(/[0-9_]/g, " ")
      .split(" ")
      .filter((p) => p)
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return username.substring(0, 2).toUpperCase()
  }

  const formatBytes = (bytes: number) => {
    const absBytes = Math.abs(bytes)
    if (absBytes >= 1000000) return (bytes / 1000000).toFixed(1) + "M"
    if (absBytes >= 1000) return (bytes / 1000).toFixed(1) + "K"
    return bytes.toString()
  }

  const getStatLabel = (proj?: string) => {
    const p = proj || project
    if (p === "wikipedia") return "articles"
    if (p === "wikidata") return "items"
    if (p === "commons") return "files"
    if (p === "wikisource") return "pages"
    return "content"
  }

  const getStatValue = (editor: any) => {
    if (editor.articlesCreated) return editor.articlesCreated
    if (editor.itemsCreated) return editor.itemsCreated
    if (editor.filesUploaded) return editor.filesUploaded
    if (editor.pagesTranscribed) return editor.pagesTranscribed
    return 0
  }

  const getProjectBadgeColor = (proj: string) => {
    switch (proj) {
      case "wikipedia":
        return "bg-blue-500 text-white"
      case "wikidata":
        return "bg-emerald-500 text-white"
      case "commons":
        return "bg-amber-500 text-white"
      case "wikisource":
        return "bg-purple-500 text-white"
      default:
        return "bg-slate-500 text-white"
    }
  }

  const getAvatarColor = (editor: any) => {
    if (project !== "all") return "bg-blue-600"
    switch (editor.project) {
      case "wikipedia":
        return "bg-blue-600"
      case "wikidata":
        return "bg-emerald-600"
      case "commons":
        return "bg-amber-600"
      case "wikisource":
        return "bg-purple-600"
      default:
        return "bg-slate-600"
    }
  }

  const selectedEditor = editors.find((e) => e.username === selectedUser)
  const contributions = selectedUser ? mockData.userContributions[selectedUser] || [] : []

  return (
    <div>
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="gap-2 bg-transparent">
          <ChevronLeft className="w-5 h-5" />
          Back to Overview
        </Button>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-5 pb-6 border-b border-slate-200 mb-6">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${config.bgColor}`}>
            <Icon className={`w-10 h-10 ${config.color}`} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{config.name}</h2>
            <p className="text-slate-500">{config.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          {config.kpis.map((kpi) => (
            <div key={kpi.label} className="text-center p-5 bg-slate-50 rounded-xl">
              <span className="block text-3xl font-bold text-slate-800">{kpi.value}</span>
              <span className="text-sm text-slate-500">{kpi.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            {project === "all" ? "All Editors" : "Top Editors"}
          </h3>

          <div className="flex gap-3 mb-5 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search editors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {project === "all" && (
              <select
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
                className="min-w-[160px] px-4 py-2 border border-slate-200 rounded-lg bg-white text-sm"
              >
                <option value="all">All Projects</option>
                <option value="wikipedia">Wikipedia</option>
                <option value="wikidata">Wikidata</option>
                <option value="commons">Commons</option>
                <option value="wikisource">Wikisource</option>
              </select>
            )}

            <select
              value={selectedUser || ""}
              onChange={(e) => setSelectedUser(e.target.value || null)}
              className="min-w-[200px] px-4 py-2 border border-slate-200 rounded-lg bg-white text-sm"
            >
              <option value="">Select an editor</option>
              {editors.map((editor) => (
                <option key={editor.id} value={editor.username}>
                  {editor.username}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEditors.map((editor) => (
              <div
                key={editor.id}
                onClick={() => setSelectedUser(editor.username)}
                className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                  selectedUser === editor.username
                    ? "bg-blue-50 border-2 border-blue-500"
                    : "bg-slate-50 hover:bg-slate-100"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full text-white flex items-center justify-center font-semibold text-lg flex-shrink-0 ${getAvatarColor(editor)}`}
                >
                  {getInitials(editor.username)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800 truncate">{editor.username}</span>
                    {project === "all" && (editor as any).project && (
                      <Badge className={`text-xs px-2 py-0 ${getProjectBadgeColor((editor as any).project)}`}>
                        {(editor as any).project}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-slate-500">
                    {editor.edits} edits • {getStatValue(editor)} {getStatLabel((editor as any).project)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedEditor && (
            <div className="mt-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-5 mb-6">
                <div
                  className={`w-20 h-20 rounded-full text-white flex items-center justify-center font-bold text-3xl ${getAvatarColor(selectedEditor)}`}
                >
                  {getInitials(selectedEditor.username)}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="text-xl font-bold text-slate-800">{selectedEditor.username}</h4>
                    {project === "all" && (selectedEditor as any).project && (
                      <Badge className={getProjectBadgeColor((selectedEditor as any).project)}>
                        {(selectedEditor as any).project}
                      </Badge>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm">Member since {selectedEditor.joinDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white rounded-xl">
                  <span className="block text-2xl font-bold text-blue-600">
                    {selectedEditor.edits.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 uppercase">Total Edits</span>
                </div>
                <div className="text-center p-4 bg-white rounded-xl">
                  <span className="block text-2xl font-bold text-blue-600">
                    {formatBytes(selectedEditor.bytesAdded)}
                  </span>
                  <span className="text-xs text-slate-500 uppercase">Bytes Added</span>
                </div>
                <div className="text-center p-4 bg-white rounded-xl">
                  <span className="block text-2xl font-bold text-blue-600">{getStatValue(selectedEditor)}</span>
                  <span className="text-xs text-slate-500 uppercase capitalize">
                    {getStatLabel((selectedEditor as any).project)}
                  </span>
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-slate-800 mb-3">Recent Contributions</h5>
                <div className="space-y-2">
                  {contributions.length > 0 ? (
                    contributions.map((contribution, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="text-blue-600 font-medium">{contribution.article}</span>
                        <span className="text-slate-500 text-sm">
                          {contribution.date} • {formatBytes(contribution.bytes)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 bg-white rounded-lg text-slate-500">No recent contributions</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
