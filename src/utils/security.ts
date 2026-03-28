// Security & Privacy Utilities for GhostSpend AI

/**
 * maskPII - Replaces credit card digits at indexes 4-12 with '*'
 * and obscures last names from full name strings.
 */
export function maskPII(data: Record<string, unknown>): Record<string, unknown> {
  const masked = { ...data };
  for (const key in masked) {
    const value = masked[key];
    if (typeof value === 'string') {
      // Mask credit card numbers: replace chars at index 4-12 with '*'
      if (/^\d{13,19}$/.test(value.replace(/[\s-]/g, ''))) {
        const clean = value.replace(/[\s-]/g, '');
        masked[key] = clean.slice(0, 4) + '********' + clean.slice(12);
      }
      // Obscure last names: "First Last" -> "First L."
      else if (/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(value)) {
        const parts = value.split(' ');
        masked[key] = `${parts[0]} ${parts[1][0]}.`;
      }
    }
  }
  return masked;
}

const VAULT_KEY = 'ghostspend_vault';

/** Save audit results to localStorage for offline continuity */
export function saveToVault(data: unknown): void {
  try {
    localStorage.setItem(VAULT_KEY, JSON.stringify({ timestamp: Date.now(), data }));
  } catch (e) {
    console.error('Vault write failed:', e);
  }
}

/** Read audit results from localStorage (offline fallback) */
export function readFromVault(): unknown | null {
  try {
    const raw = localStorage.getItem(VAULT_KEY);
    if (!raw) return null;
    return JSON.parse(raw).data;
  } catch {
    return null;
  }
}

/** Check network and return cache if offline */
export function getWithOfflineFallback(liveData: unknown): unknown {
  if (!navigator.onLine) {
    const cached = readFromVault();
    if (cached) return cached;
  }
  saveToVault(liveData);
  return liveData;
}

/** Compute a basic SHA-256 hash of a string for the offline_logic_hash */
export async function computeHash(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
