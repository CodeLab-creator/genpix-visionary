import { Wand2, ChevronDown, ChevronUp, Info } from "lucide-react";
import { useState } from "react";

interface EnhancedPromptPreviewProps {
  originalPrompt: string;
  enhancedPrompt: string;
  isLoading?: boolean;
  negativePromptIncluded?: boolean;
}

export function EnhancedPromptPreview({
  originalPrompt,
  enhancedPrompt,
  isLoading = false,
  negativePromptIncluded = true,
}: EnhancedPromptPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!enhancedPrompt && !isLoading) return null;

  return (
    <div className="genpix-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-genpix-cyan" />
          <span className="text-sm font-medium">Enhanced Prompt</span>
          {isLoading && (
            <div className="w-4 h-4 border-2 border-genpix-cyan border-t-transparent rounded-full animate-spin" />
          )}
        </div>
        <div className="flex items-center gap-2">
          {negativePromptIncluded && (
            <span className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground flex items-center gap-1">
              <Info className="w-3 h-3" />
              Negative Prompt Included
            </span>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-secondary rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          <div className="h-4 bg-secondary rounded animate-pulse w-full" />
          <div className="h-4 bg-secondary rounded animate-pulse w-3/4" />
        </div>
      ) : (
        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "" : "max-h-16"}`}>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {enhancedPrompt}
          </p>
        </div>
      )}
    </div>
  );
}
