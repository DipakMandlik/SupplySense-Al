// Client-side demo authentication for the Pibythree SupplySense AI accelerator.
// A real deployment would replace this with SSO / an identity provider; the
// session flag and check-points below exist so the sign-in gate is fully
// functional in this standalone demo rather than a decorative screen.

const SESSION_KEY = "pibythree_supplysense_session";

export const DEMO_CREDENTIALS = { username: "admin", password: "admin" };

export interface Session {
  username: string;
  signedInAt: string;
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}

export function signIn(username: string, password: string): boolean {
  const ok =
    username.trim().toLowerCase() === DEMO_CREDENTIALS.username &&
    password === DEMO_CREDENTIALS.password;
  if (ok) {
    const session: Session = { username: username.trim(), signedInAt: new Date().toISOString() };
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  return ok;
}

export function signOut() {
  window.sessionStorage.removeItem(SESSION_KEY);
}
