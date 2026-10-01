class Platform {
  static #platform = null;
  static #browser = null;

  /**
   * Returns the current platform.
   * @returns {string} 'macOS' | 'iOS' | 'android' | 'windows' | 'linux' | 'unknown'
   */
  static getPlatform() {
    if (Platform.#platform) return Platform.#platform;

    const uad = navigator.userAgentData;
    if (uad?.platform) {
      const p = uad.platform;
      if (p === 'macOS') return Platform.#platform = 'macOS';
      if (p === 'iOS') return Platform.#platform = 'iOS';
      if (p === 'Android') return Platform.#platform = 'android';
      if (p === 'Windows') return Platform.#platform = 'windows';
      if (p === 'Linux') return Platform.#platform = 'linux';
      return Platform.#platform = 'unknown';
    }

    // (deprecated!) old fallback
    const ua = navigator.userAgent;
    const pl = navigator.platform ?? '';
    if (/iphone|ipad|ipod/i.test(ua)) return Platform.#platform = 'iOS';
    if (/android/i.test(ua)) return Platform.#platform = 'android';
    if (/mac/i.test(pl)) return Platform.#platform = 'macOS'; // we just do mac because we can have 'MacIntel' on Apple Silicon
    if (/win/i.test(pl)) return Platform.#platform = 'windows';
    if (/linux/i.test(pl)) return Platform.#platform = 'linux';
    return Platform.#platform = 'unknown';
  }

  /**
   * Returns the current browser.
   * @returns {string} 'chromium' | 'safari' | 'firefox' | 'unknown'
   */
  static getBrowser() {
    if (Platform.#browser) return Platform.#browser;

    const ua = navigator.userAgent; // we use this order because chrome contains safari, and nothing contains firefox
    if (/firefox/i.test(ua)) return Platform.#browser = 'firefox';
    if (/chrome|chromium|crios/i.test(ua)) return Platform.#browser = 'chromium';
    if (/safari/i.test(ua)) return Platform.#browser = 'safari';
    return Platform.#browser = 'unknown';
  }

  static isMobile() {
    const p = Platform.getPlatform();
    return p === 'iOS' || p === 'android';
  }

  /**
   * Checks if the browser is outdated.
   * @returns {object} { ok: true } | { ok: false, reasons: string[] }
   */
  static isOutdated() {
    const reasons = [];
    if (!CSS.supports('color', 'oklch(50% 0.2 250)')) reasons.push('does not support modern CSS');
    if (typeof structuredClone !== 'function') reasons.push('outdated ES version');
    return reasons.length ? { ok: false, reasons } : { ok: true };
  }
}

export { Platform };
