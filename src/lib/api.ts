// API configuration — change this to your deployed URL when ready
const API_BASE_URL = "http://localhost:8000";

export const API_ENDPOINTS = {
  register: `${API_BASE_URL}/api/auth/registration/`,
  login: `${API_BASE_URL}/api/auth/login/`,
  logout: `${API_BASE_URL}/api/auth/logout/`,
  user: `${API_BASE_URL}/api/auth/user/`,
  passwordReset: `${API_BASE_URL}/api/auth/password/reset/`,
  passwordResetConfirm: `${API_BASE_URL}/api/auth/password/reset/confirm/`,
} as const;

// --- Types ---

interface RegisterPayload {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

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

export function registerUser(payload: RegisterPayload) {
  return authFetch<AuthResponse>(API_ENDPOINTS.register, payload);
}

export function loginUser(payload: LoginPayload) {
  return authFetch<AuthResponse>(API_ENDPOINTS.login, payload);
}

export function requestPasswordReset(email: string) {
  return authFetch<{ detail: string }>(API_ENDPOINTS.passwordReset, { email });
}
