"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { mockData } from "@/lib/mock-data"

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredArticles = mockData.articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.project.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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

  return (
    <section>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-lg font-semibold text-slate-800">Articles Overview</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-72"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <h4 className="text-base font-semibold text-blue-600 mb-2">{article.title}</h4>
            <div className="flex gap-4 mb-3 flex-wrap">
              <span
                className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${getProjectBadgeClass(article.project)}`}
              >
                {article.project}
              </span>
              <span className="text-xs text-slate-500">By {article.author}</span>
              <span className="text-xs text-slate-500">{article.edits} edits</span>
              <span className="text-xs text-slate-500">{formatBytes(article.bytes)}</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">{article.excerpt}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
