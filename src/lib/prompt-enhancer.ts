import type { StyleType } from "@/components/generate/StyleSelector";

interface PromptEnhancementConfig {
  style: StyleType;
  aspectRatio: string;
}

const stylePrompts: Record<StyleType, string> = {
  realistic: "photorealistic, natural lighting, DSLR camera quality, real-world textures, sharp focus, high detail, 8K resolution",
  anime: "anime style, clean line art, stylized proportions, soft shading, vibrant colors, cel shaded, Studio Ghibli inspired",
  "3d-render": "3D render, physically based rendering, global illumination, studio lighting, octane render, Blender, CGI quality",
  "oil-painting": "oil painting style, visible brush strokes, painterly texture, classical art, rich colors, canvas texture, masterpiece",
  cinematic: "cinematic shot, dramatic lighting, film grain, shallow depth of field, wide framing, anamorphic lens, movie still",
};

const aspectRatioPrompts: Record<string, string> = {
  "1:1": "square composition, centered framing",
  "16:9": "wide cinematic composition, horizontal layout, panoramic view",
  "9:16": "vertical portrait composition, tall framing, mobile-optimized",
};

const qualityEnhancers = [
  "ultra high resolution",
  "highly detailed",
  "professional quality",
  "sharp focus",
  "intricate details",
];

const negativePrompt = `blur, blurry, low resolution, low quality, pixelated, distortion, distorted, 
extra limbs, extra fingers, missing fingers, bad anatomy, incorrect anatomy, deformed, 
disfigured, mutated, artifacts, watermark, signature, text, logo, oversharpening, 
low-quality textures, noise, grainy, out of focus, duplicate, clone, poorly drawn`;

export function enhancePrompt(
  originalPrompt: string,
  config: PromptEnhancementConfig
): { enhancedPrompt: string; negativePrompt: string } {
  // Clean and normalize the original prompt
  const cleanedPrompt = originalPrompt.trim();
  
  if (!cleanedPrompt) {
    return { enhancedPrompt: "", negativePrompt };
  }

  // Get style-specific enhancements
  const styleEnhancement = stylePrompts[config.style];
  const aspectEnhancement = aspectRatioPrompts[config.aspectRatio];
  
  // Build the enhanced prompt
  const parts: string[] = [];
  
  // Add the original prompt first (user intent is priority)
  parts.push(cleanedPrompt);
  
  // Add style-specific enhancements
  parts.push(styleEnhancement);
  
  // Add aspect ratio context
  parts.push(aspectEnhancement);
  
  // Add quality enhancers
  parts.push(qualityEnhancers.join(", "));

  const enhancedPrompt = parts.join(", ");

  return {
    enhancedPrompt,
    negativePrompt: negativePrompt.replace(/\n/g, " ").replace(/\s+/g, " ").trim(),
  };
}

export function getStyleDescription(style: StyleType): string {
  const descriptions: Record<StyleType, string> = {
    realistic: "Photorealistic imagery with natural lighting and real-world textures",
    anime: "Japanese animation style with clean lines and vibrant colors",
    "3d-render": "Computer-generated 3D graphics with studio-quality lighting",
    "oil-painting": "Classical oil painting style with visible brushwork",
    cinematic: "Movie-quality shots with dramatic lighting and film aesthetics",
  };
  return descriptions[style];
}
