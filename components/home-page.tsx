"use client"

import KPISection from "@/components/kpi-section"
import ProjectsGrid from "@/components/projects-grid"
import ActivityTable from "@/components/activity-table"
import MetricsCharts from "@/components/metrics-charts"

interface HomePageProps {
  onNavigate: (page: string) => void
  dateRange: { from: string; to: string }
}

export default function HomePage({ onNavigate, dateRange }: HomePageProps) {
  return (
    <div className="space-y-8">
      <KPISection />
      <ProjectsGrid onNavigate={onNavigate} />
      <MetricsCharts />
      <ActivityTable dateRange={dateRange} />
    </div>
  )
}
