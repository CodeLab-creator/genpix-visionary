import { useState, useEffect, useCallback } from "react";
import { Zap } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PromptInput } from "@/components/generate/PromptInput";
import { StyleSelector, type StyleType } from "@/components/generate/StyleSelector";
import { AspectRatioSelector, type AspectRatio } from "@/components/generate/AspectRatioSelector";
import { ModelSelector } from "@/components/generate/ModelSelector";
import { EnhancedPromptPreview } from "@/components/generate/EnhancedPromptPreview";
import { GenerationProgress } from "@/components/generate/GenerationProgress";
import { GenerationResult } from "@/components/generate/GenerationResult";
import { RecentGenerations } from "@/components/generate/RecentGenerations";
import { useImageGeneration } from "@/hooks/useImageGeneration";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

interface Generation {
  id: string;
  imageUrl: string;
  prompt: string;
}

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<StyleType>("realistic");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("1:1");
  const [recentGenerations, setRecentGenerations] = useState<Generation[]>([]);

  const {
    isGenerating,
    isEnhancing,
    progress,
    status,
    generatedImage,
    enhancedPrompt,
    generate,
    enhanceUserPrompt,
    reset,
  } = useImageGeneration();

  // Debounced prompt enhancement
  const debouncedEnhance = useDebouncedCallback(
    (p: string, s: StyleType, a: AspectRatio) => {
      if (p.trim().length > 10) {
        enhanceUserPrompt(p, s, a);
      }
    },
    800
  );

  useEffect(() => {
    debouncedEnhance(prompt, style, aspectRatio);
  }, [prompt, style, aspectRatio, debouncedEnhance]);

  const handleGenerate = async () => {
    await generate({ prompt, style, aspectRatio });
  };

  const handleRegenerate = async () => {
    await generate({ prompt, style, aspectRatio });
  };

  // Add to recent generations when a new image is generated
  useEffect(() => {
    if (generatedImage) {
      const newGeneration: Generation = {
        id: Date.now().toString(),
        imageUrl: generatedImage,
        prompt,
      };
      setRecentGenerations((prev) => [newGeneration, ...prev].slice(0, 8));
    }
  }, [generatedImage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === "Enter" && !isGenerating) {
      handleGenerate();
    }
  };

  return (
    <MainLayout>
      <div className="p-8 max-w-5xl mx-auto space-y-8" onKeyDown={handleKeyDown}>
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold font-display">
            Create <span className="genpix-gradient-text">Anything.</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Input your prompt below and let GenPix AI weave its magic.
          </p>
        </div>

        {/* Prompt Input */}
        <PromptInput
          value={prompt}
          onChange={setPrompt}
        />

        {/* Enhanced Prompt Preview */}
        <EnhancedPromptPreview
          originalPrompt={prompt}
          enhancedPrompt={enhancedPrompt}
          isLoading={isEnhancing}
        />

        {/* Style Selection */}
        <StyleSelector selected={style} onSelect={setStyle} />

        {/* Aspect Ratio & Model */}
        <div className="grid grid-cols-2 gap-8">
          <AspectRatioSelector selected={aspectRatio} onSelect={setAspectRatio} />
          <ModelSelector />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="generate-btn text-white"
        >
          <Zap className="w-5 h-5 inline-block mr-2" />
          {isGenerating ? "Generating..." : "GENERATE IMAGES"}
        </button>

        {/* Generation Progress */}
        {isGenerating && (
          <GenerationProgress progress={progress} status={status} />
        )}

        {/* Generated Result */}
        {generatedImage && !isGenerating && (
          <GenerationResult
            imageUrl={generatedImage}
            prompt={enhancedPrompt || prompt}
            onRegenerate={handleRegenerate}
          />
        )}

        {/* Recent Generations */}
        <RecentGenerations
          generations={recentGenerations}
          onClear={() => setRecentGenerations([])}
          onSelect={(gen) => {
            setPrompt(gen.prompt);
          }}
        />
      </div>
    </MainLayout>
  );
}
