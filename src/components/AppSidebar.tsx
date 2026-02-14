import {
  LayoutDashboard, ShoppingCart, Receipt, Package, BarChart3,
  Settings, LogOut, Bot, ChevronLeft,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const mainNav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Sales", url: "/dashboard/sales", icon: ShoppingCart },
  { title: "Expenses", url: "/dashboard/expenses", icon: Receipt },
  { title: "Inventory", url: "/dashboard/inventory", icon: Package },
  { title: "Reports", url: "/dashboard/reports", icon: BarChart3 },
];

const secondaryNav = [
  { title: "AI Copilot", url: "/dashboard/copilot", icon: Bot },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border bg-card">
      <SidebarHeader className="p-4 flex flex-row items-center justify-between">
        <span className="font-display font-bold text-lg text-accent tracking-tight">Nexus</span>
        <SidebarTrigger className="text-muted-foreground hover:text-foreground h-7 w-7">
          <ChevronLeft className="h-4 w-4" />
        </SidebarTrigger>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground/60 px-3 mb-1">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                      activeClassName="bg-accent/10 text-accent font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground/60 px-3 mb-1 mt-4">
            Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                      activeClassName="bg-accent/10 text-accent font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-border">
        <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full">
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
