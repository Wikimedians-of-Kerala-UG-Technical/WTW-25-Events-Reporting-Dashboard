"use client"

import { useState } from "react"
import { Calendar, Users, FileText, TrendingUp, ExternalLink, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const programsData = [
  {
    id: 1,
    name: "Lyon Heritage Documentation",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    participants: 24,
    articles: 156,
    edits: 3456,
    bytesAdded: 2340000,
    progress: 78,
    description: "Documenting Lyon's historical sites and cultural heritage across Wikimedia projects.",
    projects: ["Wikipedia", "Commons", "Wikidata"],
  },
  {
    id: 2,
    name: "French Literature Transcription",
    status: "active",
    startDate: "2024-03-01",
    endDate: "2024-11-30",
    participants: 12,
    articles: 89,
    edits: 1234,
    bytesAdded: 890000,
    progress: 65,
    description: "Transcribing historical French literary works from Lyon archives.",
    projects: ["Wikisource", "Wikidata"],
  },
  {
    id: 3,
    name: "Museum Digitization Initiative",
    status: "active",
    startDate: "2024-02-10",
    endDate: "2025-02-10",
    participants: 18,
    articles: 234,
    edits: 2567,
    bytesAdded: 5670000,
    progress: 45,
    description: "Uploading and cataloging artifacts from Lyon museums to Commons.",
    projects: ["Commons", "Wikidata", "Wikipedia"],
  },
  {
    id: 4,
    name: "BU Lyon Academic Research",
    status: "completed",
    startDate: "2023-09-01",
    endDate: "2024-06-30",
    participants: 35,
    articles: 312,
    edits: 5678,
    bytesAdded: 4560000,
    progress: 100,
    description: "Academic research program integrating university resources with Wikimedia.",
    projects: ["Wikipedia", "Wikidata", "Wikisource"],
  },
  {
    id: 5,
    name: "Local History Editathon",
    status: "upcoming",
    startDate: "2025-01-15",
    endDate: "2025-03-15",
    participants: 0,
    articles: 0,
    edits: 0,
    bytesAdded: 0,
    progress: 0,
    description: "Upcoming editathon focused on local Lyon neighborhood histories.",
    projects: ["Wikipedia", "Commons"],
  },
  {
    id: 6,
    name: "Silk Industry Archive Project",
    status: "active",
    startDate: "2024-05-01",
    endDate: "2024-12-15",
    participants: 8,
    articles: 67,
    edits: 890,
    bytesAdded: 670000,
    progress: 82,
    description: "Preserving the history of Lyon's silk industry through digitization.",
    projects: ["Wikipedia", "Wikisource", "Commons"],
  },
]

export default function ProgramsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedProgram, setSelectedProgram] = useState<(typeof programsData)[0] | null>(null)

  const filteredPrograms = programsData.filter((program) => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || program.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalStats = {
    programs: programsData.length,
    activePrograms: programsData.filter((p) => p.status === "active").length,
    totalParticipants: programsData.reduce((sum, p) => sum + p.participants, 0),
    totalArticles: programsData.reduce((sum, p) => sum + p.articles, 0),
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "completed":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "upcoming":
        return "bg-amber-100 text-amber-700 border-amber-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const getProjectColor = (project: string) => {
    switch (project) {
      case "Wikipedia":
        return "bg-blue-500"
      case "Wikidata":
        return "bg-emerald-500"
      case "Commons":
        return "bg-amber-500"
      case "Wikisource":
        return "bg-purple-500"
      default:
        return "bg-slate-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Programs</p>
                <p className="text-3xl font-bold text-blue-700">{totalStats.programs}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600 font-medium">Active Programs</p>
                <p className="text-3xl font-bold text-emerald-700">{totalStats.activePrograms}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Total Participants</p>
                <p className="text-3xl font-bold text-purple-700">{totalStats.totalParticipants}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600 font-medium">Total Articles</p>
                <p className="text-3xl font-bold text-amber-700">{totalStats.totalArticles}</p>
              </div>
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
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
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
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
                variant={statusFilter === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("active")}
                className={statusFilter === "active" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              >
                Active
              </Button>
              <Button
                variant={statusFilter === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("completed")}
                className={statusFilter === "completed" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                Completed
              </Button>
              <Button
                variant={statusFilter === "upcoming" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("upcoming")}
                className={statusFilter === "upcoming" ? "bg-amber-600 hover:bg-amber-700" : ""}
              >
                Upcoming
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredPrograms.map((program) => (
          <Card
            key={program.id}
            className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500"
            onClick={() => setSelectedProgram(program)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{program.name}</CardTitle>
                  <p className="text-sm text-slate-500 mt-1">{program.description}</p>
                </div>
                <Badge className={getStatusColor(program.status)}>{program.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  {program.projects.map((project) => (
                    <span
                      key={project}
                      className={`px-2 py-1 rounded-full text-xs text-white ${getProjectColor(project)}`}
                    >
                      {project}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-3 text-center">
                  <div>
                    <p className="text-lg font-bold text-slate-700">{program.participants}</p>
                    <p className="text-xs text-slate-500">Participants</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-700">{program.articles}</p>
                    <p className="text-xs text-slate-500">Articles</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-700">{program.edits.toLocaleString()}</p>
                    <p className="text-xs text-slate-500">Edits</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-700">{(program.bytesAdded / 1000000).toFixed(1)}M</p>
                    <p className="text-xs text-slate-500">Bytes</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Progress</span>
                    <span>{program.progress}%</span>
                  </div>
                  <Progress value={program.progress} className="h-2" />
                </div>

                <div className="flex justify-between text-xs text-slate-500 pt-2 border-t">
                  <span>Start: {program.startDate}</span>
                  <span>End: {program.endDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
            <CardHeader className="border-b">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{selectedProgram.name}</CardTitle>
                  <Badge className={`mt-2 ${getStatusColor(selectedProgram.status)}`}>{selectedProgram.status}</Badge>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedProgram(null)}>
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <p className="text-slate-600">{selectedProgram.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{selectedProgram.participants}</p>
                  <p className="text-sm text-slate-500">Participants</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-emerald-600">{selectedProgram.articles}</p>
                  <p className="text-sm text-slate-500">Articles</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-purple-600">{selectedProgram.edits.toLocaleString()}</p>
                  <p className="text-sm text-slate-500">Total Edits</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-amber-600">
                    {(selectedProgram.bytesAdded / 1000000).toFixed(2)}M
                  </p>
                  <p className="text-sm text-slate-500">Bytes Added</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Contributing Projects</h4>
                <div className="flex gap-2 flex-wrap">
                  {selectedProgram.projects.map((project) => (
                    <span
                      key={project}
                      className={`px-3 py-2 rounded-lg text-sm text-white ${getProjectColor(project)}`}
                    >
                      {project}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Progress</h4>
                <Progress value={selectedProgram.progress} className="h-3" />
                <p className="text-sm text-slate-500 mt-2">{selectedProgram.progress}% complete</p>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <div>
                  <p className="text-sm text-slate-500">Start Date</p>
                  <p className="font-medium">{selectedProgram.startDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">End Date</p>
                  <p className="font-medium">{selectedProgram.endDate}</p>
                </div>
              </div>

              <Button className="w-full" asChild>
                <a
                  href="https://outreachdashboard.wmflabs.org/campaigns/bu_lyon_3/programs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Outreach Dashboard <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
