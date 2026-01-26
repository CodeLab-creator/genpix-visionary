import { ChevronDown, Lock } from "lucide-react";

export function ModelSelector() {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        AI Model
      </h3>
      <div className="relative">
        <button
          disabled
          className="w-full flex items-center justify-between px-4 py-3 bg-secondary rounded-lg text-sm border border-border cursor-not-allowed"
        >
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-genpix-cyan" />
            <span>GenPix Turbo v4.0</span>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
