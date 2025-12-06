"use client"

import { BookOpen, Database, ImageIcon, FileText } from "lucide-react"

interface ProjectsGridProps {
  onNavigate: (page: string) => void
}

const projects = [
  {
    id: "wikipedia",
    name: "Wikipedia",
    icon: BookOpen,
    color: "text-slate-800",
    bgColor: "bg-slate-100",
    progressColor: "bg-slate-800",
    stats: { articles: 892, editors: 156, edits: "23,456", bytes: "1.2M" },
    progress: 78,
  },
  {
    id: "wikidata",
    name: "Wikidata",
    icon: Database,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    progressColor: "bg-emerald-600",
    stats: { articles: 534, editors: 89, edits: "12,789", bytes: "456K" },
    progress: 65,
  },
  {
    id: "commons",
    name: "Wikimedia Commons",
    icon: ImageIcon,
    color: "text-sky-600",
    bgColor: "bg-sky-100",
    progressColor: "bg-sky-600",
    stats: { articles: 287, editors: 67, edits: "5,234", bytes: "580K" },
    progress: 52,
  },
  {
    id: "wikisource",
    name: "Wikisource",
    icon: FileText,
    color: "text-orange-700",
    bgColor: "bg-orange-100",
    progressColor: "bg-orange-700",
    stats: { articles: 134, editors: 45, edits: "4,413", bytes: "189K" },
    progress: 41,
  },
]

export default function ProjectsGrid({ onNavigate }: ProjectsGridProps) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-800 mb-5">Project Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {projects.map((project) => {
          const Icon = project.icon
          return (
            <div
              key={project.id}
              onClick={() => onNavigate(project.id)}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${project.bgColor}`}>
                  <Icon className={`w-6 h-6 ${project.color}`} />
                </div>
                <h3 className="text-lg font-semibold">{project.name}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <span className="block text-xl font-bold text-slate-800">{project.stats.articles}</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">
                    {project.id === "wikidata" ? "Items" : project.id === "commons" ? "Files" : "Articles"}
                  </span>
                </div>
                <div>
                  <span className="block text-xl font-bold text-slate-800">{project.stats.editors}</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Editors</span>
                </div>
                <div>
                  <span className="block text-xl font-bold text-slate-800">{project.stats.edits}</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Edits</span>
                </div>
                <div>
                  <span className="block text-xl font-bold text-slate-800">{project.stats.bytes}</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Bytes</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${project.progressColor}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500">{project.progress}% of target</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
