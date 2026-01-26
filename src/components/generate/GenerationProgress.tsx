import { Loader2 } from "lucide-react";

interface GenerationProgressProps {
  progress: number;
  status: string;
}

export function GenerationProgress({ progress, status }: GenerationProgressProps) {
  return (
    <div className="genpix-card p-8 flex flex-col items-center justify-center space-y-6">
      {/* Animated Loader */}
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-4 border-secondary">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--genpix-purple))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${progress * 2.83} 283`}
              className="transition-all duration-300"
            />
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-genpix-cyan animate-spin" />
        </div>
      </div>

      {/* Progress Text */}
      <div className="text-center space-y-2">
        <p className="text-2xl font-semibold font-display">{progress}%</p>
        <p className="text-sm text-muted-foreground">{status}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, hsl(var(--genpix-purple)), hsl(var(--genpix-cyan)))",
          }}
        />
      </div>
    </div>
  );
}
