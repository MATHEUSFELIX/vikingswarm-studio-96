import { demoLearningEntries } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import { ThumbsUp, ThumbsDown, Lightbulb } from "lucide-react";

export default function LearningPage() {
  const entries = demoLearningEntries;
  const accepted = entries.filter(e => e.status === 'accepted');
  const rejected = entries.filter(e => e.status === 'rejected');

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <PageHeader title="Learning Profile" subtitle="Patterns learned from accepted and rejected initiatives" />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="rounded-xl border border-success/20 bg-success/10 p-4 text-center">
          <ThumbsUp className="h-5 w-5 text-success mx-auto mb-1" />
          <span className="font-display text-2xl font-bold">{accepted.length}</span>
          <p className="text-xs text-muted-foreground mt-1">Accepted</p>
        </div>
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-center">
          <ThumbsDown className="h-5 w-5 text-destructive mx-auto mb-1" />
          <span className="font-display text-2xl font-bold">{rejected.length}</span>
          <p className="text-xs text-muted-foreground mt-1">Rejected</p>
        </div>
      </div>

      {/* Learned Patterns */}
      <section className="mb-8">
        <h2 className="font-display text-sm font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-gold" /> Learned Patterns
        </h2>
        <div className="space-y-2">
          {entries.map(entry => (
            <div key={entry.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start gap-3">
                {entry.status === 'accepted' ? (
                  <ThumbsUp className="h-4 w-4 text-success shrink-0 mt-0.5" />
                ) : (
                  <ThumbsDown className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{entry.initiative}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{entry.reason}</p>
                  <div className="mt-2 rounded-lg bg-gold-soft p-2.5">
                    <p className="text-xs text-gold-foreground font-medium flex items-center gap-1">
                      <Lightbulb className="h-3 w-3" /> {entry.pattern}
                    </p>
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-2 inline-block">{entry.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
