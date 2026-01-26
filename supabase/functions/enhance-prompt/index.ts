import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const styleEnhancements: Record<string, string> = {
  realistic: "photorealistic, natural lighting, DSLR camera quality, real-world textures, sharp focus, high detail, 8K resolution, ultra realistic",
  anime: "anime style, clean line art, stylized proportions, soft shading, vibrant colors, cel shaded, Studio Ghibli inspired, Japanese animation",
  "3d-render": "3D render, physically based rendering, global illumination, studio lighting, octane render, Blender, CGI quality, Unreal Engine 5",
  "oil-painting": "oil painting style, visible brush strokes, painterly texture, classical art, rich colors, canvas texture, masterpiece, museum quality",
  cinematic: "cinematic shot, dramatic lighting, film grain, shallow depth of field, wide framing, anamorphic lens, movie still, Hollywood production",
};

const aspectRatioContext: Record<string, string> = {
  "1:1": "square composition, centered subject, balanced framing",
  "16:9": "wide cinematic composition, horizontal panoramic view, landscape orientation",
  "9:16": "vertical portrait composition, tall framing, mobile-optimized, portrait orientation",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, style, aspectRatio } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert prompt engineer for AI image generation. Your task is to enhance user prompts to maximize image quality and accuracy while preserving the user's original intent.

Rules:
1. ALWAYS preserve the user's core subject and intent
2. Add specific details about: lighting, composition, atmosphere, and quality
3. Include style-specific terms for the selected style
4. Keep the enhanced prompt under 200 words
5. Do not add content that contradicts the user's request
6. Output ONLY the enhanced prompt, no explanations`;

    const userMessage = `Enhance this image generation prompt for ${style} style with ${aspectRatio} aspect ratio:

"${prompt}"

Style requirements: ${styleEnhancements[style] || ""}
Composition: ${aspectRatioContext[aspectRatio] || ""}

Provide the enhanced prompt:`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      // Fallback to local enhancement
      const fallbackPrompt = `${prompt}, ${styleEnhancements[style] || ""}, ${aspectRatioContext[aspectRatio] || ""}, highly detailed, professional quality`;
      
      return new Response(
        JSON.stringify({ enhancedPrompt: fallbackPrompt }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const enhancedPrompt = data.choices?.[0]?.message?.content?.trim() || prompt;

    return new Response(
      JSON.stringify({ enhancedPrompt }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to enhance prompt" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
