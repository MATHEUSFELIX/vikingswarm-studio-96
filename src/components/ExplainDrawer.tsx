import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExplainDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  rationale: string;
  assumptions: { text: string; confidence: string; source: string }[];
  evidence: string[];
}

export default function ExplainDrawer({ open, onClose, title, rationale, assumptions, evidence }: ExplainDrawerProps) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-foreground/20 z-50" onClick={onClose} />}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full md:w-[420px] bg-card border-l border-border z-50 transform transition-transform duration-300 overflow-y-auto",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg font-bold">{title}</h2>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-accent">
              <X className="h-5 w-5" />
            </button>
          </div>

          <section className="mb-6">
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Rationale</h3>
            <p className="text-sm leading-relaxed">{rationale}</p>
          </section>

          <section className="mb-6">
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Assumptions</h3>
            <div className="space-y-3">
              {assumptions.map((a, i) => (
                <div key={i} className="rounded-lg bg-accent/50 p-3">
                  <p className="text-sm">{a.text}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-medium uppercase",
                      a.confidence === 'high' ? 'bg-success/20 text-success' :
                      a.confidence === 'medium' ? 'bg-primary/20 text-gold' :
                      'bg-destructive/20 text-destructive'
                    )}>{a.confidence}</span>
                    <span className="text-[10px] text-muted-foreground">{a.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Evidence</h3>
            <ul className="space-y-2">
              {evidence.map((e, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-gold mt-1">•</span>
                  {e}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
