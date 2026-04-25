// ─── UTENTI AUTORIZZATI ────────────────────────────────────────────────────
// Per aggiungere un utente: aggiungi un oggetto { code, name } all'array.
// Per revocare: rimuovi la riga corrispondente.
// Dopo ogni modifica: commit + push → GitHub Actions rideploya automaticamente.
//
// I codici sono case-insensitive e vengono trimati.
// ───────────────────────────────────────────────────────────────────────────

export type AuthUser = {
  code: string;  // codice di accesso univoco
  name: string;  // nome visualizzato dopo il login
};

export const AUTHORIZED_USERS: AuthUser[] = [
  { code: "admin-2024",          name: "Admin"      },
  { code: "Loris-ceo",           name: "Loris"      },
  { code: "Francesco-manager",   name: "Francesco"  },
  { code: "Luca-cto",            name: "Luca"       },
];

export function findUser(code: string): AuthUser | null {
  const normalized = code.trim().toLowerCase();
  return (
    AUTHORIZED_USERS.find((u) => u.code.toLowerCase() === normalized) ?? null
  );
}
