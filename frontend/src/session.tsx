import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Session } from "./types";

const SESSION_KEY = "ti_company_session";

type SessionContextValue = {
  session: Session | null;
  saveSession: (s: Session) => void;
  clearSession: () => void;
};

const SessionContext = createContext<SessionContextValue>({
  session: null,
  saveSession: () => undefined,
  clearSession: () => undefined,
});

function loadSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(() => loadSession());

  const saveSession = (s: Session) => {
    setSession(s);
    localStorage.setItem(SESSION_KEY, JSON.stringify(s));
  };

  const clearSession = () => {
    setSession(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const value = useMemo(
    () => ({ session, saveSession, clearSession }),
    [session]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}

export { SESSION_KEY };
