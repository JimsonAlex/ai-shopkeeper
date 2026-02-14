import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function DashboardLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen min-w-0 overflow-hidden">
          {/* Mobile header */}
          <header className="md:hidden sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-card/90 backdrop-blur-sm px-4 py-2">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground h-10 w-10 flex items-center justify-center -ml-1">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <span className="font-display font-bold text-primary flex-1">Nexus</span>
            <button
              onClick={toggleTheme}
              className="h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </header>
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
