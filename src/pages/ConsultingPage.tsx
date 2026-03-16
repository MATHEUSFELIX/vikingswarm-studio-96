import { useState } from "react";
import { dataStore, demoConsultingRun } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import MetricCard from "@/components/MetricCard";
import ExplainDrawer from "@/components/ExplainDrawer";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";

const roleColors: Record<string, string> = {
  strategist: "text-gold",
  skeptic: "text-destructive",
  analyst: "text-info",
  mediator: "text-success",
};

export default function ConsultingPage() {
  const run = demoConsultingRun;
  const [scenario, setScenario] = useState<string>("baseline");
  const [levers, setLevers] = useState(run.levers);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const multiplier = scenario === 'upside' ? 1.4 : scenario === 'downside' ? 0.6 : 1;
  const roi = run.results.roi;
  const uplift = run.results.uplift;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <PageHeader
        title="Consulting Intelligence"
        subtitle="Nordic Market Entry Strategy"
        action={
          <Button size="sm" variant="outline" onClick={() => setDrawerOpen(true)}>
            <Info className="h-4 w-4 mr-1" /> Explain
          </Button>
        }
      />

      <Tabs value={scenario} onValueChange={setScenario} className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="baseline">Baseline</TabsTrigger>
          <TabsTrigger value="upside">Upside</TabsTrigger>
          <TabsTrigger value="downside">Downside</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        <MetricCard label="ROI (Low-High)" value={`${(roi.low * multiplier).toFixed(1)}x — ${(roi.high * multiplier).toFixed(1)}x`} variant="gold" />
        <MetricCard label="Mid ROI" value={`${(roi.mid * multiplier).toFixed(1)}x`} variant="gold" />
        <MetricCard label="Uplift Range" value={`${Math.round(uplift.low * multiplier)}% — ${Math.round(uplift.high * multiplier)}%`} variant="success" />
      </div>

      {/* Levers */}
      <section className="mb-8">
        <h2 className="font-display text-sm font-semibold mb-4">Levers & Assumptions</h2>
        <div className="space-y-4 rounded-xl border border-border bg-card p-4">
          {levers.map((lever, idx) => (
            <div key={lever.id}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">{lever.name}</span>
                <span className="font-display text-sm font-bold">{lever.value} {lever.unit}</span>
              </div>
              <Slider
                value={[lever.value]}
                min={lever.min}
                max={lever.max}
                step={1}
                onValueChange={([v]) => {
                  const next = [...levers];
                  next[idx] = { ...lever, value: v };
                  setLevers(next);
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Initiatives */}
      <section className="mb-8">
        <h2 className="font-display text-sm font-semibold mb-4">Initiatives</h2>
        <div className="space-y-2">
          {run.results.initiatives.map(init => (
            <div key={init.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{init.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{init.description}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[10px] bg-accent px-2 py-0.5 rounded-full">Impact: {init.impact}</span>
                    <span className="text-[10px] bg-accent px-2 py-0.5 rounded-full">Effort: {init.effort}</span>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => dataStore.updateInitiativeStatus(init.id, 'accepted')}
                    className={`p-1.5 rounded-lg transition-colors ${init.status === 'accepted' ? 'bg-success/20 text-success' : 'hover:bg-accent text-muted-foreground'}`}
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => dataStore.updateInitiativeStatus(init.id, 'rejected')}
                    className={`p-1.5 rounded-lg transition-colors ${init.status === 'rejected' ? 'bg-destructive/20 text-destructive' : 'hover:bg-accent text-muted-foreground'}`}
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Agent Debate Panel */}
      <section>
        <h2 className="font-display text-sm font-semibold mb-4 flex items-center gap-2">
          <MessageSquare className="h-4 w-4" /> Agent Debate
        </h2>
        <div className="space-y-3 rounded-xl border border-border bg-card p-4">
          {run.agentDebate.map(msg => (
            <div key={msg.id} className="flex gap-3">
              <div className={`h-8 w-8 rounded-full bg-accent flex items-center justify-center shrink-0 text-xs font-display font-bold ${roleColors[msg.role]}`}>
                {msg.agent[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-xs font-medium ${roleColors[msg.role]}`}>{msg.agent}</span>
                  <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
                </div>
                <p className="text-sm leading-relaxed">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ExplainDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Analysis Explainability"
        rationale={run.results.rationale}
        assumptions={run.assumptions}
        evidence={run.results.evidence}
      />
    </div>
  );
}
