import { NavLink, useLocation } from "react-router-dom";
import { Home, Briefcase, Users, FileSearch, BarChart3, Brain, Shield } from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/consulting", icon: Briefcase, label: "Consulting Intelligence" },
  { to: "/social", icon: Users, label: "Social Simulation" },
  { to: "/research", icon: FileSearch, label: "Research Studio" },
  { to: "/reports", icon: BarChart3, label: "Reports & Graphs" },
  { to: "/learning", icon: Brain, label: "Learning Profile" },
];

export default function DesktopSidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border h-screen sticky top-0 surface-elevated">
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-sm font-bold tracking-tight">VikingSwarm</h1>
            <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Studio v5</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
          return (
            <NavLink
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                active
                  ? "bg-gold-soft text-gold-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Icon className={`h-4 w-4 ${active ? "text-gold" : ""}`} />
              {label}
            </NavLink>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <p className="text-[10px] text-muted-foreground">© 2025 VikingSwarm</p>
      </div>
    </aside>
  );
}
