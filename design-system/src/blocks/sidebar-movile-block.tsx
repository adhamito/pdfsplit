import * as React from "react"
import { ShoppingCart, Package, FileText, User } from "lucide-react"
import type { LucideProps } from "lucide-react"

type NavItem = {
  title: string
  url: string
  icon: React.ComponentType<LucideProps>
  isActive?: boolean
  notify?: boolean
}

type UserInfo = {
  name: string
  email: string
  avatar: string
}

export default function DashboardLayout({ children, navMain, user }: { children: React.ReactNode; navMain?: NavItem[]; user?: UserInfo }) {
  const defaultNav: NavItem[] = [
    { title: "Commandes", url: "#", icon: ShoppingCart, isActive: true },
    { title: "Stock", url: "#", icon: Package },
    { title: "Documents", url: "#", icon: FileText, notify: true },
    { title: "Profil", url: "#", icon: User },
  ]
  const items = navMain ?? defaultNav

  return (
    <div className="min-h-svh w-full">
      <div className="p-3 md:p-4 pb-24 md:pb-4">
        {children}
      </div>
      <footer className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t">
        <div className="relative">
          <div className="absolute left-1/2 -top-3 -translate-x-1/2 h-10 w-28 rounded-b-full bg-background"></div>
          <div className="absolute left-1/2 -top-6 -translate-x-1/2">
            <div className="h-14 w-14 rounded-full border-2 border-sidebar-accent bg-background shadow-md flex items-center justify-center">
              <img src="/logo.svg" alt="DAWA" className="h-auto w-full object-contain" />
            </div>
          </div>
          <nav className="flex items-end justify-around px-2 py-2">
            {items.map((item) => {
              const accentText = !!item.isActive
              return (
                <a key={item.title} href={item.url} className={"relative flex flex-col items-center gap-1 text-xs " + (accentText ? "text-sidebar-accent" : "text-muted-foreground") }>
                  <span className="relative inline-flex">
                    <item.icon className="h-6 w-6" fill={accentText ? "currentColor" : "none"} />
                    {item.notify && (
                      <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-destructive"></span>
                    )}
                  </span>
                  <span>{item.title}</span>
                </a>
              )
            })}
          </nav>
        </div>
      </footer>
    </div>
  )
}