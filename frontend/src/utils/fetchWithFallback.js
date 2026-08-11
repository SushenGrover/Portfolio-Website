/**
 * Fetches from primary URL with automatic fallback to secondary URL on timeout.
 * Useful for college WiFi that blocks custom domains but allows direct IPs.
 */
export async function fetchWithFallback(primaryUrl, fallbackUrl, options = {}) {
  const timeoutMs = options.timeout || 3000; // 3 second timeout

  try {
    // Try primary URL with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

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

        // Try fallback URL
        const fallbackResponse = await fetch(fallbackUrl, options);
        console.log(`✅ Successfully connected via fallback URL`);
        return fallbackResponse;
      }

      throw primaryError;
    }
  } catch (error) {
    console.error(`❌ Both URLs failed:`, error);
    throw error;
  }
}
