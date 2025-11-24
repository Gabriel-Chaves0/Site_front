import type {
  ApiResponse,
  ClientCreate,
  Service,
  ServiceInput,
  Session,
  Solicitation,
  SolicitationInput,
} from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function request<T>(
  path: string,
  init: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(init.headers || {}),
      },
      ...init,
    });
    const json = (await res.json()) as ApiResponse<T>;
    return json;
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Erro de rede",
    };
  }
}

export const api = {
  login(payload: { login: string; password: string }) {
    return request<Session>("/auth", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  registerClient(payload: ClientCreate) {
    return request<null>("/clientes", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  changePassword(payload: {
    login: string;
    old_password: string;
    new_password: string;
  }) {
    return request<null>("/clientes/trocar-senha", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  listServices() {
    return request<Service[]>("/servicos");
  },
  createService(payload: ServiceInput) {
    return request<Service>("/servicos", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  getSolicitations(login: string) {
    return request<Solicitation[]>(`/solicitacoes/${encodeURIComponent(login)}`);
  },
  saveSolicitations(login: string, items: SolicitationInput[]) {
    return request<Solicitation[]>(`/solicitacoes/${encodeURIComponent(login)}`, {
      method: "PUT",
      body: JSON.stringify({ items }),
    });
  },
};

export { API_URL };
