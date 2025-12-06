"use client"

import { Globe, BookOpen, FileText, Users, Bell, Home } from "lucide-react"

interface SidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "programs", label: "Programs", icon: BookOpen },
    { id: "articles", label: "Articles", icon: FileText },
    { id: "editors", label: "Editors", icon: Users },
    { id: "alerts", label: "Alerts", icon: Bell },
  ]

  return (
    <aside className="w-64 bg-slate-800 text-white fixed h-screen flex flex-col z-50 max-lg:w-20 max-md:w-full max-md:h-auto max-md:relative max-md:flex-row max-md:p-3">
      <div className="flex items-center gap-3 p-6 border-b border-white/10 max-md:p-0 max-md:border-0">
        <Globe className="w-8 h-8 text-blue-400" />
        <span className="text-xl font-bold max-lg:hidden">Wiki Events</span>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1 max-md:flex-row max-md:flex-1 max-md:justify-end max-md:p-0 max-md:gap-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium max-lg:justify-center max-md:p-2 ${
                currentPage === item.id ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="max-lg:hidden">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-5 border-t border-white/10 max-lg:hidden max-md:hidden">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider">Campaign</span>
          <span className="font-semibold">BU Lyon 3</span>
        </div>
      </div>
    </aside>
  )
}
