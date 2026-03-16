import { useState } from "react";
import { demoSocialRun } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import MetricCard from "@/components/MetricCard";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

export default function SocialPage() {
  const run = demoSocialRun;
  const [config, setConfig] = useState(run.config);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <PageHeader title="Social & Opinion Simulation" subtitle="Product Launch Social Impact" />

      {/* Results metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <MetricCard label="Final Sentiment" value={`${Math.round(run.results.finalSentiment * 100)}%`} variant="gold" sub="Positive" />
        <MetricCard label="Reach" value={`${(run.results.reach / 1000).toFixed(1)}K`} variant="info" />
        <MetricCard label="Engagement" value={`${run.results.engagement}%`} variant="success" />
        <MetricCard label="Viral Moments" value={run.results.viralMoments} sub={`Top: ${run.results.topPlatform}`} />
      </div>

      {/* Timeline Chart */}
      <section className="mb-8">
        <h2 className="font-display text-sm font-semibold mb-4">Sentiment Timeline</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={run.timeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="round" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="positive" stroke="hsl(var(--success))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="neutral" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="negative" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Config */}
      <section>
        <h2 className="font-display text-sm font-semibold mb-4">Simulation Config</h2>
        <div className="rounded-xl border border-border bg-card p-4 space-y-5">
          {[
            { label: "Agents", key: "agentCount" as const, min: 50, max: 2000, step: 50 },
            { label: "Rounds", key: "rounds" as const, min: 5, max: 50, step: 1 },
            { label: "Influence Factor", key: "influence" as const, min: 0, max: 1, step: 0.05 },
            { label: "Sentiment Shock", key: "sentimentShock" as const, min: 0, max: 1, step: 0.05 },
          ].map(({ label, key, min, max, step }) => (
            <div key={key}>
              <div className="flex justify-between mb-1">
                <span className="text-sm">{label}</span>
                <span className="font-display text-sm font-bold">{config[key]}</span>
              </div>
              <Slider
                value={[config[key]]}
                min={min}
                max={max}
                step={step}
                onValueChange={([v]) => setConfig(prev => ({ ...prev, [key]: v }))}
              />
            </div>
          ))}

          <div>
            <span className="text-sm">Platforms</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {['Twitter', 'LinkedIn', 'Reddit', 'TikTok', 'Facebook'].map(p => (
                <button
                  key={p}
                  onClick={() => {
                    setConfig(prev => ({
                      ...prev,
                      platforms: prev.platforms.includes(p) ? prev.platforms.filter(x => x !== p) : [...prev.platforms, p]
                    }));
                  }}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    config.platforms.includes(p) ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
