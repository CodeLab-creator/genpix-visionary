import { Download, Copy, Share2, ZoomIn, RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";

interface GenerationResultProps {
  imageUrl: string;
  prompt: string;
  seed?: number;
  dimensions?: string;
  steps?: number;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export function GenerationResult({
  imageUrl,
  prompt,
  seed = Math.floor(Math.random() * 9999999999),
  dimensions = "1024 × 1024",
  steps = 50,
  onRegenerate,
  isRegenerating = false,
}: GenerationResultProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `genpix-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
    } catch (error) {
      console.error("Failed to copy image:", error);
    }
  };

  return (
    <div className="genpix-card p-6 space-y-4">
      <div className="relative group">
        <div className="aspect-square relative overflow-hidden rounded-xl bg-secondary">
          <img
            src={imageUrl}
            alt={prompt}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isZoomed ? "scale-150" : ""
            }`}
          />
          
          {/* Action Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
              >
                <Download className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={handleCopy}
                className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
              >
                <Copy className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                <Share2 className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
              >
                <ZoomIn className="w-5 h-5 text-white" />
              </button>
              <button className="px-4 py-2 bg-genpix-cyan/90 backdrop-blur-sm rounded-lg hover:bg-genpix-cyan transition-colors text-sm font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Upscale 4x
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-4 gap-3">
        <div className="text-center p-3 bg-secondary rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Dimensions</p>
          <p className="text-sm font-medium">{dimensions}</p>
        </div>
        <div className="text-center p-3 bg-secondary rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Model</p>
          <p className="text-sm font-medium">GenPix XL v2</p>
        </div>
        <div className="text-center p-3 bg-secondary rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Steps</p>
          <p className="text-sm font-medium">{steps}</p>
        </div>
        <div className="text-center p-3 bg-secondary rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Seed</p>
          <p className="text-sm font-medium font-mono text-xs">{seed}</p>
        </div>
      </div>

      {/* Regenerate Button */}
      <button
        onClick={onRegenerate}
        disabled={isRegenerating}
        className="w-full py-3 rounded-xl font-medium bg-primary hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <RefreshCw className={`w-4 h-4 ${isRegenerating ? "animate-spin" : ""}`} />
        {isRegenerating ? "Regenerating..." : "Regenerate (2 Credits)"}
      </button>
    </div>
  );
}
