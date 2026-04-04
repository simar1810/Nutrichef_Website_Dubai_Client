/** Same-origin via app/api-backend proxy; set BACKEND_PROXY_TARGET server-side. Avoids CORS to ngrok/another port. */
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "/api-backend/api/v1";
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || "";

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refreshToken");
}

function setTokens(access: string, refresh: string) {
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
}

export function clearTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) {
      clearTokens();
      return null;
    }
    const json = await res.json();
    const data = json.data;
    if (data?.accessToken && data?.refreshToken) {
      setTokens(data.accessToken, data.refreshToken);
      return data.accessToken;
    }
    clearTokens();
    return null;
  } catch {
    clearTokens();
    return null;
  }
}

interface RequestOptions {
  headers?: Record<string, string>;
  noAuth?: boolean;
  [key: string]: unknown;
}

async function request<T = unknown>(
  method: string,
  path: string,
  body?: unknown,
  opts: RequestOptions = {}
): Promise<{ data: T; message: string; status_code: number }> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...opts.headers,
  };

  if (TENANT_ID) {
    headers["X-Tenant-Id"] = TENANT_ID;
  }

  if (!opts.noAuth) {
    const token = getAccessToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const fetchOpts: RequestInit = { method, headers };
  if (body !== undefined) {
    fetchOpts.body = JSON.stringify(body);
  }

  let res = await fetch(`${BASE_URL}${path}`, fetchOpts);

  if (res.status === 401 && !opts.noAuth) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      headers["Authorization"] = `Bearer ${newToken}`;
      fetchOpts.headers = headers;
      res = await fetch(`${BASE_URL}${path}`, fetchOpts);
    }
  }

  const json = await res.json();

  if (!res.ok) {
    const err = new Error(json.message || `Request failed: ${res.status}`) as Error & {
      status: number;
      response: typeof json;
    };
    err.status = res.status;
    err.response = json;
    throw err;
  }

  return json;
}

export const api = {
  get: <T = unknown>(path: string, opts?: RequestOptions) =>
    request<T>("GET", path, undefined, opts),

  post: <T = unknown>(path: string, body?: unknown, opts?: RequestOptions) =>
    request<T>("POST", path, body, opts),

  put: <T = unknown>(path: string, body?: unknown, opts?: RequestOptions) =>
    request<T>("PUT", path, body, opts),

  patch: <T = unknown>(path: string, body?: unknown, opts?: RequestOptions) =>
    request<T>("PATCH", path, body, opts),

  delete: <T = unknown>(path: string, opts?: RequestOptions) =>
    request<T>("DELETE", path, undefined, opts),
};

export { TENANT_ID };
