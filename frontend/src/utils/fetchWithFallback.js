/**
 * Fetches from primary URL with automatic fallback to secondary URL on timeout.
 * Useful for college WiFi that blocks custom domains but allows direct IPs.
 */
export async function fetchWithFallback(primaryUrl, fallbackUrl, options = {}) {
  const primaryTimeoutMs = options.primaryTimeout || 4000; // 4 second timeout for primary
  const fallbackTimeoutMs = options.fallbackTimeout || 10000; // 10 second timeout for fallback (Render can be slow)

  try {
    // Try primary URL with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), primaryTimeoutMs);

    try {
      const response = await fetch(primaryUrl, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (primaryError) {
      clearTimeout(timeoutId);

      // If it's a timeout or network error, try fallback
      if (
        primaryError.name === "AbortError" ||
        primaryError instanceof TypeError
      ) {
        console.warn(
          `⚠️ Primary URL timeout (${primaryUrl}). Trying fallback: ${fallbackUrl}`,
        );

        // Try fallback URL with longer timeout
        const fallbackController = new AbortController();
        const fallbackTimeoutId = setTimeout(
          () => fallbackController.abort(),
          fallbackTimeoutMs,
        );

        try {
          const fallbackResponse = await fetch(fallbackUrl, {
            ...options,
            signal: fallbackController.signal,
          });
          clearTimeout(fallbackTimeoutId);
          console.log(`✅ Successfully connected via fallback URL`);
          return fallbackResponse;
        } catch (fallbackError) {
          clearTimeout(fallbackTimeoutId);
          throw fallbackError;
        }
      }

      throw primaryError;
    }
  } catch (error) {
    console.error(`❌ Both URLs failed:`, error);
    throw error;
  }
}
