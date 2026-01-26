import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { StyleType } from "@/components/generate/StyleSelector";
import type { AspectRatio } from "@/components/generate/AspectRatioSelector";
import { enhancePrompt } from "@/lib/prompt-enhancer";
import { toast } from "@/hooks/use-toast";

interface GenerationState {
  isGenerating: boolean;
  isEnhancing: boolean;
  progress: number;
  status: string;
  generatedImage: string | null;
  enhancedPrompt: string;
  error: string | null;
}

interface GenerationParams {
  prompt: string;
  style: StyleType;
  aspectRatio: AspectRatio;
}

export function useImageGeneration() {
  const [state, setState] = useState<GenerationState>({
    isGenerating: false,
    isEnhancing: false,
    progress: 0,
    status: "",
    generatedImage: null,
    enhancedPrompt: "",
    error: null,
  });

  const enhanceUserPrompt = useCallback(async (prompt: string, style: StyleType, aspectRatio: AspectRatio) => {
    if (!prompt.trim()) {
      setState(prev => ({ ...prev, enhancedPrompt: "" }));
      return "";
    }

    setState(prev => ({ ...prev, isEnhancing: true }));

    try {
      const { data, error } = await supabase.functions.invoke("enhance-prompt", {
        body: { prompt, style, aspectRatio },
      });

      if (error) throw error;

      const enhanced = data.enhancedPrompt || enhancePrompt(prompt, { style, aspectRatio }).enhancedPrompt;
      setState(prev => ({ ...prev, enhancedPrompt: enhanced, isEnhancing: false }));
      return enhanced;
    } catch (error) {
      // Fallback to local enhancement
      const { enhancedPrompt } = enhancePrompt(prompt, { style, aspectRatio });
      setState(prev => ({ ...prev, enhancedPrompt, isEnhancing: false }));
      return enhancedPrompt;
    }
  }, []);

  const generate = useCallback(async (params: GenerationParams) => {
    const { prompt, style, aspectRatio } = params;

    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a description for your image.",
        variant: "destructive",
      });
      return;
    }

    setState(prev => ({
      ...prev,
      isGenerating: true,
      progress: 0,
      status: "Enhancing prompt...",
      error: null,
      generatedImage: null,
    }));

    try {
      // Step 1: Enhance prompt
      setState(prev => ({ ...prev, progress: 10, status: "Enhancing prompt..." }));
      
      const enhancedPrompt = await enhanceUserPrompt(prompt, style, aspectRatio);
      
      // Step 2: Generate image
      setState(prev => ({ ...prev, progress: 30, status: "Generating image..." }));

      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: {
          prompt: enhancedPrompt || prompt,
          style,
          aspectRatio,
        },
      });

      if (error) {
        throw new Error(error.message || "Failed to generate image");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      // Simulate progress
      for (let i = 40; i <= 90; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setState(prev => ({ ...prev, progress: i, status: "Processing..." }));
      }

      setState(prev => ({
        ...prev,
        progress: 100,
        status: "Complete!",
        generatedImage: data.imageUrl,
        isGenerating: false,
      }));

      toast({
        title: "Image generated!",
        description: "Your image has been created successfully.",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to generate image";
      setState(prev => ({
        ...prev,
        isGenerating: false,
        progress: 0,
        status: "",
        error: message,
      }));

      toast({
        title: "Generation failed",
        description: message,
        variant: "destructive",
      });
    }
  }, [enhanceUserPrompt]);

  const reset = useCallback(() => {
    setState({
      isGenerating: false,
      isEnhancing: false,
      progress: 0,
      status: "",
      generatedImage: null,
      enhancedPrompt: "",
      error: null,
    });
  }, []);

  return {
    ...state,
    generate,
    enhanceUserPrompt,
    reset,
  };
}
