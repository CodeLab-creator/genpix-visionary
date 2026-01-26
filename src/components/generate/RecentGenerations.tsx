import { Trash2 } from "lucide-react";

interface Generation {
  id: string;
  imageUrl: string;
  prompt: string;
}

interface RecentGenerationsProps {
  generations: Generation[];
  onClear?: () => void;
  onSelect?: (generation: Generation) => void;
}

export function RecentGenerations({
  generations,
  onClear,
  onSelect,
}: RecentGenerationsProps) {
  if (generations.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold font-display">Recent Generations</h3>
        {onClear && (
          <button
            onClick={onClear}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
          >
            Clear all
            <Trash2 className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {generations.slice(0, 4).map((gen) => (
          <button
            key={gen.id}
            onClick={() => onSelect?.(gen)}
            className="aspect-square rounded-xl overflow-hidden hover:ring-2 hover:ring-primary transition-all"
          >
            <img
              src={gen.imageUrl}
              alt={gen.prompt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
