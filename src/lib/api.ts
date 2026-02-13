// API configuration — change this to your deployed URL when ready
const API_BASE_URL = "http://localhost:8000";

export const API_ENDPOINTS = {
  logout: `${API_BASE_URL}/api/auth/logout/`,
  user: `${API_BASE_URL}/api/auth/user/`,
  googleLogin: `${API_BASE_URL}/api/auth/google/`,
} as const;

// --- Types ---

interface AuthResponse {
  key?: string;
  access?: string;
  refresh?: string;
}

interface AuthError {
  [field: string]: string[];
}

// --- Helpers ---

function flattenErrors(errors: AuthError): string {
  return Object.entries(errors)
    .map(([field, msgs]) => {
      const label = field === "non_field_errors" ? "" : `${field}: `;
      return `${label}${msgs.join(", ")}`;
    })
    .join(". ");
}

async function authFetch<T>(url: string, body: object): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errors: AuthError = await res.json();
    throw new Error(flattenErrors(errors));
  }

  return res.json();
}

// --- Public API ---

/** Send Google ID token to Django for verification & login/registration */
export function googleLogin(idToken: string) {
  return authFetch<AuthResponse>(API_ENDPOINTS.googleLogin, { id_token: idToken });
}
