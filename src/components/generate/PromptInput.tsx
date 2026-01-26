import { Sparkles, Image, Mic } from "lucide-react";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function PromptInput({ value, onChange, placeholder }: PromptInputProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute left-4 top-4 text-genpix-cyan">
          <Sparkles className="w-5 h-5" />
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Describe what you want to create... (e.g., 'A futuristic city at sunset in a cyberpunk style')"}
          className="genpix-input w-full min-h-[100px] pl-12 pr-4 resize-none"
          rows={3}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary">
            <Image className="w-4 h-4" />
            Reference Image
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary">
            <Mic className="w-4 h-4" />
            Voice
          </button>
        </div>
        <span className="text-xs text-muted-foreground">
          Ctrl + Enter to generate
        </span>
      </div>
    </div>
  );
}
