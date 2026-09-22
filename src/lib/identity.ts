const VISITOR_KEY = "vlady_visitor_id";
const SESSION_KEY = "vlady_session_id";

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let value = localStorage.getItem(VISITOR_KEY);
  if (!value) {
    value = id("v");
    localStorage.setItem(VISITOR_KEY, value);
  }
  return value;
}

export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let value = sessionStorage.getItem(SESSION_KEY);
  if (!value) {
    value = id("s");
    sessionStorage.setItem(SESSION_KEY, value);
  }
  return value;
}

export function generateEventId(label: string): string {
  return `${label}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}