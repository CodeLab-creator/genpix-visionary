import { Square, RectangleHorizontal, RectangleVertical } from "lucide-react";

export type AspectRatio = "1:1" | "16:9" | "9:16";

interface AspectOption {
  id: AspectRatio;
  label: string;
  icon: typeof Square;
}

const aspectOptions: AspectOption[] = [
  { id: "1:1", label: "1:1", icon: Square },
  { id: "16:9", label: "16:9", icon: RectangleHorizontal },
  { id: "9:16", label: "9:16", icon: RectangleVertical },
];

interface AspectRatioSelectorProps {
  selected: AspectRatio;
  onSelect: (ratio: AspectRatio) => void;
}

export function AspectRatioSelector({ selected, onSelect }: AspectRatioSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Aspect Ratio
      </h3>
      <div className="flex gap-2">
        {aspectOptions.map((option) => {
          const isActive = selected === option.id;
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`aspect-toggle flex items-center gap-2 ${isActive ? "active" : ""}`}
            >
              <Icon className="w-4 h-4" />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
