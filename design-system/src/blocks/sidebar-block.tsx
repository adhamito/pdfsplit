import * as React from "react"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  AlertCircle,
} from "lucide-react"

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { LucideProps } from "lucide-react"

type NavItem = {
  title: string
  url: string
  icon: React.ComponentType<LucideProps>
  isActive?: boolean
}

type UserInfo = {
  name: string
  email: string
  avatar: string
}

// Menu Data (defaults)
const data = {
  user: {
    name: "Dawa User",
    email: "user@dawa.mg",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Tableau de bord",
      url: "#",
      icon: AlertCircle,
      isActive: true, // Simulating active state
    },
    {
      title: "Produits",
      url: "#",
      icon: Package,
    },
    {
      title: "Commandes",
      url: "#",
      icon: ShoppingCart,
    },
    {
      title: "Clients",
      url: "#",
      icon: Users,
    },
    {
      title: "Paramètres",
      url: "#",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ navMain, user, ...props }: React.ComponentProps<typeof Sidebar> & { navMain?: NavItem[]; user?: UserInfo }) {
  const { state, toggleSidebar, isMobile } = useSidebar()
  const _user = user ?? data.user 
  const _navMain = navMain ?? data.navMain

  return (
    <Sidebar collapsible="icon" {...props} className="border=1 border-accent/10  ">
   
      <SidebarHeader className="relative h-16 border-b border-sidebar-accent/30
       px-3 py-2">
        <div className="flex h-full w-full items-center gap-3 relative">
          {state === "expanded" ? (
            <div className="group-data-[collapsible=icon]:hidden">
              <img
                src="/logo.svg"
                alt="DAWA"
                className="h-8 w-auto object-contain max-w-[130px]"
              />
            </div>
          ) : (
            <div>
              <img
                src="/Brand.svg"
                alt="DAWA"
                className="h-4 w-4 object-contain max-w-[30px]"
              />
            </div>
          )}
          
        </div>
      </SidebarHeader>

      {/* 2. ENHANCED CONTENT with Hover/Active States */}
      <SidebarContent className="pt-2 md:pt-2">
        <div className="px-2 pt-3 pb-3 text-[10px] 
        font-medium tracking-wider text-muted-foreground uppercase">Général</div>
        <SidebarMenu className="gap-2 px-2">
          {_navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={item.isActive}
                tooltip={item.title}
                size={isMobile ? "lg" : "default"}
                className="
                    rounded-lg font-normal transition-all duration-200
                    bg-transparent text-muted-foreground
                     hover:bg-transparent/70 hover:text-white
                    data-[active=true]:bg-sidebar-accent/30 
                    data-[active=true]:text-sidebar-accent 
                    data-[active=true]:font-semibold 
                    data-[active=true]:border-sidebar-accent
                    data-[active=true]:shadow-inner
                    data-[active=true]:hover:bg-transparent/70
                    data-[active=true]:hover:text-white
                    group-data-[collapsible=icon]:h-11
                    group-data-[collapsible=icon]:w-11
                    group-data-[collapsible=icon]:justify-center  
                    group-data-[collapsible=icon]:p-0
                    group-data-[collapsible=icon]:rounded-md
                    group-data-[collapsible=icon]:bg-transparent
                    group-data-[collapsible=icon]:shadow-none
                    group-data-[collapsible=icon]:hover:bg-transparent
                    group-data-[collapsible=icon]:hover:text-white
                    group-data-[collapsible=icon]:data-[active=true]:bg-sidebar-accent/10
                    group-data-[collapsible=icon]:data-[active=true]:hover:bg-transparent/70
                    group-data-[collapsible=icon]:data-[active=true]:text-sidebar-accent/70 
                    group-data-[collapsible=icon]:data-[active=true]:hover:text-white
                    group-data-[collapsible=icon]:data-[active=true]:shadow-none 
                    group-data-[collapsible=icon]:data-[active=true]:ring-0
                "
              >
                <a href={item.url} onClick={isMobile ? () => toggleSidebar() : undefined} className="flex items-center gap-3">
                  <span className="w-6 flex justify-center">
                    <item.icon className="size-5" />
                  </span>
                  <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator className="mx-2" />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-2 px-2 py-2 
                rounded-md bg-transparent hover:bg-gray-50 hover:text-white 
                data-[state=open]:bg-transparent data-[state=open]:shadow-sm 
                data-[state=open]:ring-1 data-[state=open]:ring-border 
                group-data-[collapsible=icon]:h-9 
                group-data-[collapsible=icon]:w-9 group-data-[collapsible=icon]:p-0 
                group-data-[collapsible=icon]:justify-center">
                  <Avatar className="h-7 w-7 rounded-full ">x
                    <AvatarImage src={_user.avatar} alt={_user.name} />
                    <AvatarFallback className="rounded-full bg-sidebar-accent/30 text-sidebar-accent">DU</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-medium text-primary/80">{_user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{_user.email}</span>
                  </div>
                  <ChevronDown className="ml-auto size-4 text-muted-foreground transition-transform group-data-[collapsible=icon]:hidden data-[state=open]:rotate-180" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width]
                 min-w-56 rounded-lg bg-background shadow-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-full">
                      <AvatarImage src={data.user.avatar} alt={data.user.name} />
                      <AvatarFallback className="rounded-full bg-sidebar-accent/15 text-sidebar-accent">DU</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{data.user.name}</span>
                      <span className="truncate text-xs text-muted-foreground">{data.user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4 bg-primary/20" />
                  Mon compte
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                  <LogOut className="mr-2 h-4 w-4" />
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      
      {/* 4. THE COLLAPSE TRIGGER (Usually placed on the rail or handled by context) */}
      <SidebarRail />
    </Sidebar>
  )
}

type SidebarBlockProps = {
  navMain?: NavItem[]
  user?: UserInfo
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  children?: React.ReactNode
}

function SidebarBlock(props: SidebarBlockProps) {
  const openProp = props.collapsed === undefined ? undefined : !props.collapsed
  const defaultOpenProp =
    props.defaultCollapsed === undefined ? undefined : !props.defaultCollapsed
  const onOpenChangeProp = props.onCollapsedChange
    ? (open: boolean) => props.onCollapsedChange!(open === false)
    : undefined
  return (
    <SidebarProvider
      open={openProp}
      defaultOpen={defaultOpenProp}
      onOpenChange={onOpenChangeProp}
      style={{ "--sidebar-width": "16rem", "--sidebar-width-icon": "70px" } as React.CSSProperties}
    >
      <div className="md:hidden sticky top-0 z-20 md:z-0 flex items-center gap-2 bg-background/80 backdrop-blur px-2 py-2 border-b">
        <SidebarTrigger />
        <img src="/Brand.svg" alt="DAWA" className="h-6 w-6" />
      </div>
      <AppSidebar navMain={props.navMain} user={props.user} />
      {props.children}
    </SidebarProvider>
  )
}

export { SidebarBlock }