import { NavLink, useLocation } from "react-router-dom";
import { Home, Briefcase, Users, FileSearch, BarChart3, Brain } from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/consulting", icon: Briefcase, label: "Consult" },
  { to: "/social", icon: Users, label: "Social" },
  { to: "/research", icon: FileSearch, label: "Research" },
  { to: "/reports", icon: BarChart3, label: "Reports" },
  { to: "/learning", icon: Brain, label: "Learn" },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border glass md:hidden">
      <div className="flex items-center justify-around py-1.5 px-1">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
          return (
            <NavLink
              key={to}
              to={to}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors text-xs ${
                active ? "text-gold font-medium" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "text-gold" : ""}`} />
              <span>{label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
