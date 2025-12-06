"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import HomePage from "@/components/home-page"
import ArticlesPage from "@/components/articles-page"
import ProjectPage from "@/components/project-page"
import ProgramsPage from "@/components/programs-page"
import AlertsPage from "@/components/alerts-page"

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState("home")
  const [dateRange, setDateRange] = useState({
    from: "2024-01-01",
    to: "2024-12-31",
  })

  const pageTitles: Record<string, string> = {
    home: "Events Reporting Dashboard",
    programs: "Programs Overview",
    articles: "Articles Overview",
    editors: "Editors Overview",
    alerts: "Alerts & Notifications",
    wikipedia: "Wikipedia Events Dashboard",
    wikidata: "Wikidata Events Dashboard",
    commons: "Wikimedia Commons Events Dashboard",
    wikisource: "Wikisource Events Dashboard",
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="flex-1 ml-64 max-lg:ml-20 max-md:ml-0">
        <Header
          title={pageTitles[currentPage] || "Events Reporting Dashboard"}
          dateRange={dateRange}
          onDateChange={setDateRange}
        />

        <div className="p-8 max-md:p-4">
          {currentPage === "home" && <HomePage onNavigate={setCurrentPage} dateRange={dateRange} />}
          {currentPage === "programs" && <ProgramsPage />}
          {currentPage === "articles" && <ArticlesPage />}
          {currentPage === "editors" && <ProjectPage project="all" onBack={() => setCurrentPage("home")} />}
          {currentPage === "alerts" && <AlertsPage />}
          {currentPage === "wikipedia" && <ProjectPage project="wikipedia" onBack={() => setCurrentPage("home")} />}
          {currentPage === "wikidata" && <ProjectPage project="wikidata" onBack={() => setCurrentPage("home")} />}
          {currentPage === "commons" && <ProjectPage project="commons" onBack={() => setCurrentPage("home")} />}
          {currentPage === "wikisource" && <ProjectPage project="wikisource" onBack={() => setCurrentPage("home")} />}
        </div>
      </main>
    </div>
  )
}
