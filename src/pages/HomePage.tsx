import { Link } from "react-router-dom";
import { dataStore } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import MetricCard from "@/components/MetricCard";
import { Briefcase, Users, FileSearch, BarChart3, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const modeIcons = { consulting: Briefcase, social: Users, research: FileSearch };
const modeColors = { consulting: "text-gold", social: "text-info", research: "text-success" };
const modeBg = { consulting: "bg-gold-soft", social: "bg-info/10", research: "bg-success/10" };

export default function HomePage() {
  const projects = dataStore.getProjects();
  const completed = projects.filter(p => p.status === 'completed').length;
  const running = projects.filter(p => p.status === 'running').length;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <PageHeader
        title="Command Center"
        subtitle="Strategic intelligence at your fingertips"
        action={
          <Link to="/projects/new">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-1" /> New Project
            </Button>
          </Link>
        }
      />

      {/* Metrics row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <MetricCard label="Projects" value={projects.length} variant="gold" />
        <MetricCard label="Completed" value={completed} variant="success" />
        <MetricCard label="Running" value={running} variant="info" />
        <MetricCard label="Insights" value={dataStore.getLearningEntries().length} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        {[
          { to: "/consulting", label: "Consulting Intelligence", desc: "Scenario modeling & agent debate", icon: Briefcase, color: "text-gold", bg: "bg-gold-soft" },
          { to: "/social", label: "Social Simulation", desc: "Opinion dynamics & sentiment", icon: Users, color: "text-info", bg: "bg-info/10" },
          { to: "/research", label: "Research Studio", desc: "Clustering, themes & responses", icon: FileSearch, color: "text-success", bg: "bg-success/10" },
        ].map(item => (
          <Link key={item.to} to={item.to} className="group rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-all animate-slide-up">
            <div className={`h-10 w-10 rounded-lg ${item.bg} flex items-center justify-center mb-3`}>
              <item.icon className={`h-5 w-5 ${item.color}`} />
            </div>
            <h3 className="font-display text-sm font-semibold mb-1">{item.label}</h3>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
            <ArrowRight className="h-4 w-4 text-muted-foreground mt-3 group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>

      {/* Project list */}
      <h2 className="font-display text-base font-semibold mb-3">Recent Projects</h2>
      <div className="space-y-2">
        {projects.map(project => {
          const Icon = modeIcons[project.mode];
          return (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-all"
            >
              <div className={`h-9 w-9 rounded-lg ${modeBg[project.mode]} flex items-center justify-center shrink-0`}>
                <Icon className={`h-4 w-4 ${modeColors[project.mode]}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{project.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{project.description}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-medium shrink-0 ${
                project.status === 'completed' ? 'bg-success/10 text-success' :
                project.status === 'running' ? 'bg-info/10 text-info' :
                'bg-accent text-muted-foreground'
              }`}>{project.status}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
