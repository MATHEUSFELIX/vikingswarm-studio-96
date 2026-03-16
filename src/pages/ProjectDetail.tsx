import { useParams, Link } from "react-router-dom";
import { dataStore } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import { Briefcase, Users, FileSearch, ArrowRight, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const modeRoutes = { consulting: '/consulting', social: '/social', research: '/research' };
const modeLabels = { consulting: 'Consulting Intelligence', social: 'Social Simulation', research: 'Research Studio' };

export default function ProjectDetail() {
  const { id } = useParams();
  const project = dataStore.getProject(id || '');

  if (!project) {
    return (
      <div className="p-4 md:p-8 text-center">
        <p className="text-muted-foreground">Project not found.</p>
        <Link to="/" className="text-gold text-sm mt-2 inline-block">← Back home</Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <Link to="/" className="text-xs text-muted-foreground hover:text-foreground mb-4 inline-block">← All Projects</Link>
      <PageHeader title={project.name} subtitle={project.description} />

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map(tag => (
          <span key={tag} className="text-xs bg-accent px-2.5 py-1 rounded-full flex items-center gap-1">
            <Tag className="h-3 w-3" /> {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-8">
        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(project.createdAt).toLocaleDateString()}</span>
        <span className={`px-2 py-0.5 rounded-full uppercase font-medium ${
          project.status === 'completed' ? 'bg-success/10 text-success' :
          project.status === 'running' ? 'bg-info/10 text-info' :
          'bg-accent text-muted-foreground'
        }`}>{project.status}</span>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="font-display text-sm font-semibold mb-2">{modeLabels[project.mode]}</h2>
        <p className="text-sm text-muted-foreground mb-4">View the full analysis, simulation results, and generated insights for this project.</p>
        <Link to={modeRoutes[project.mode]}>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Open Run <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
