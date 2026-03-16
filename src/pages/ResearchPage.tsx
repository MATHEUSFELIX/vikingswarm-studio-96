import { demoResearchRun } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import MetricCard from "@/components/MetricCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";

const toneColors: Record<string, string> = {
  empathetic: "bg-info/10 text-info border-info/20",
  professional: "bg-gold-soft text-gold-foreground border-gold/20",
  direct: "bg-success/10 text-success border-success/20",
  casual: "bg-accent text-accent-foreground border-border",
};

const barColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--muted-foreground))",
];

export default function ResearchPage() {
  const run = demoResearchRun;

  const chartData = run.clusters.map(c => ({
    name: c.label,
    size: c.size,
    sentiment: Math.round(c.sentiment * 100),
  }));

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <PageHeader title="Research Response Studio" subtitle="Customer Feedback Analysis Q1" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        <MetricCard label="Overall Sentiment" value={`${Math.round(run.overallSentiment * 100)}%`} variant="gold" sub="Positive" />
        <MetricCard label="Clusters" value={run.clusters.length} variant="info" />
        <MetricCard label="Responses" value={run.clusters.reduce((s, c) => s + c.size, 0).toLocaleString()} variant="success" />
      </div>

      {/* Cluster chart */}
      <section className="mb-8">
        <h2 className="font-display text-sm font-semibold mb-4">Cluster Distribution</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" width={110} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
              <Bar dataKey="size" radius={[0, 4, 4, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={barColors[i % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Themes */}
      <section className="mb-8">
        <h2 className="font-display text-sm font-semibold mb-4">Key Themes</h2>
        <div className="space-y-2">
          {run.themes.map((theme, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg bg-card border border-border p-3">
              <span className="text-gold font-display text-sm font-bold">{i + 1}.</span>
              <span className="text-sm">{theme}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Clusters detail */}
      <section className="mb-8">
        <h2 className="font-display text-sm font-semibold mb-4">Clusters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {run.clusters.map(cluster => (
            <div key={cluster.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm">{cluster.label}</h3>
                <span className={`text-xs font-display font-bold ${cluster.sentiment >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {cluster.sentiment > 0 ? '+' : ''}{Math.round(cluster.sentiment * 100)}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{cluster.size} responses</p>
              <div className="flex flex-wrap gap-1">
                {cluster.keywords.map(kw => (
                  <span key={kw} className="text-[10px] bg-accent px-2 py-0.5 rounded-full">{kw}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Suggested Responses */}
      <section>
        <h2 className="font-display text-sm font-semibold mb-4">Suggested Responses</h2>
        <div className="space-y-3">
          {run.suggestedResponses.map(resp => (
            <div key={resp.id} className={`rounded-xl border p-4 ${toneColors[resp.tone]}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider">{resp.tone}</span>
                <span className="text-[10px] opacity-60">→ {run.clusters.find(c => c.id === resp.clusterId)?.label}</span>
              </div>
              <p className="text-sm leading-relaxed">{resp.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
