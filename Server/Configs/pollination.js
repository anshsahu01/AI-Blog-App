export const generatePollinationUrl = (prompt, width = 512, height = 512, seed = 42, model = "flux") => {
  return `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}`;
};
