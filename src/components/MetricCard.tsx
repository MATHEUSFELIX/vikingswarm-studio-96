import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: ReactNode;
  variant?: "default" | "gold" | "success" | "info";
  className?: string;
}

const variantClasses = {
  default: "bg-card border-border",
  gold: "bg-gold-soft border-gold/20 gold-glow",
  success: "bg-success/10 border-success/20",
  info: "bg-info/10 border-info/20",
};

export default function MetricCard({ label, value, sub, icon, variant = "default", className }: MetricCardProps) {
  return (
    <div className={cn("rounded-xl border p-4 animate-slide-up", variantClasses[variant], className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
        {icon}
      </div>
      <div className="font-display text-2xl font-bold">{value}</div>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}
