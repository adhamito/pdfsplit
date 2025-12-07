import * as React from "react"
import { SidebarInset } from "@/components/ui/sidebar"
import { SidebarBlock } from "./sidebar-block"
import MobileDashboardLayout from "./sidebar-movile-block"

type NavItem = {
  title: string
  url: string
  icon: React.ComponentType<any>
  isActive?: boolean
}

type UserInfo = {
  name: string
  email: string
  avatar: string
}

type DashboardBlockProps = {
  children?: React.ReactNode
  navMain?: NavItem[]
  user?: UserInfo
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

export function DashboardBlock({ 
  children, 
  navMain, 
  user, 
  collapsed, 
  defaultCollapsed, 
  onCollapsedChange 
}: DashboardBlockProps) {
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(collapsed ?? defaultCollapsed ?? false)

  // Handle external collapsed prop changes
  React.useEffect(() => {
    if (collapsed !== undefined) {
      setIsCollapsed(collapsed)
    }
  }, [collapsed])

  const handleCollapsedChange = React.useCallback(
    (c: boolean) => {
      setIsCollapsed(c)
      onCollapsedChange?.(c)
    },
    [onCollapsedChange]
  )

  // Function to toggle collapsed state
  const toggleCollapsed = React.useCallback(() => {
    const newCollapsed = !isCollapsed
    setIsCollapsed(newCollapsed)
    onCollapsedChange?.(newCollapsed)
  }, [isCollapsed, onCollapsedChange])

  // Function to set collapsed state explicitly
  const setCollapsed = React.useCallback((collapsed: boolean) => {
    setIsCollapsed(collapsed)
    onCollapsedChange?.(collapsed)
  }, [onCollapsedChange])

  // Function to expand sidebar
  const expandSidebar = React.useCallback(() => {
    setIsCollapsed(false)
    onCollapsedChange?.(false)
  }, [onCollapsedChange])

  // Function to collapse sidebar
  const collapseSidebar = React.useCallback(() => {
    setIsCollapsed(true)
    onCollapsedChange?.(true)
  }, [onCollapsedChange])

  return (
    <div className="min-h-svh w-full bg-background">
      <div className="hidden md:flex">
        <SidebarBlock
          navMain={navMain}
          user={user}
          collapsed={isCollapsed}
          defaultCollapsed={defaultCollapsed}
          onCollapsedChange={handleCollapsedChange}
        >
          <SidebarInset className="flex-1 bg-background flex flex-col min-h-svh overflow-auto">
            <div 
              className={`p-4 md:p-6 max-w-6xl mx-auto w-full flex-1 transition-all duration-300 ${
                isCollapsed ? 'md:ml-4' : ''
              }`}
              style={{
                // Sticky width that doesn't change when sidebar collapses
                width: '80%',
                maxWidth: '100%'
              }}
            >
              {children}
            </div>
          </SidebarInset>
        </SidebarBlock>
      </div>
      <div className="md:hidden">
        <MobileDashboardLayout navMain={navMain} user={user}>
          {children}
        </MobileDashboardLayout>
      </div>
    </div>
  )
}

// Hook to use the collapsed state and controls
export function useSidebarControl(
  initialCollapsed: boolean = false,
  onCollapsedChange?: (collapsed: boolean) => void
) {
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(initialCollapsed)

  const handleCollapsedChange = React.useCallback(
    (c: boolean) => {
      setIsCollapsed(c)
      onCollapsedChange?.(c)
    },
    [onCollapsedChange]
  )

  const toggleCollapsed = React.useCallback(() => {
    const newCollapsed = !isCollapsed
    setIsCollapsed(newCollapsed)
    onCollapsedChange?.(newCollapsed)
  }, [isCollapsed, onCollapsedChange])

  const setCollapsed = React.useCallback((collapsed: boolean) => {
    setIsCollapsed(collapsed)
    onCollapsedChange?.(collapsed)
  }, [onCollapsedChange])

  const expandSidebar = React.useCallback(() => {
    setIsCollapsed(false)
    onCollapsedChange?.(false)
  }, [onCollapsedChange])

  const collapseSidebar = React.useCallback(() => {
    setIsCollapsed(true)
    onCollapsedChange?.(true)
  }, [onCollapsedChange])

  return {
    isCollapsed,
    setIsCollapsed: handleCollapsedChange,
    toggleCollapsed,
    setCollapsed,
    expandSidebar,
    collapseSidebar
  }
}

// Higher Order Component to provide sidebar controls
export function withSidebarControls<P extends object>(
  WrappedComponent: React.ComponentType<P & {
    sidebarControls: ReturnType<typeof useSidebarControl>
  }>
) {
  return function WithSidebarControlsComponent(props: P) {
    const sidebarControls = useSidebarControl()

    return (
      <WrappedComponent 
        {...props} 
        sidebarControls={sidebarControls}
      />
    )
  }
}