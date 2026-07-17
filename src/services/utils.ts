// Simulated network latency so components can exercise loading states
// exactly as they would against a real backend.
export function delay<T>(value: T, ms = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
