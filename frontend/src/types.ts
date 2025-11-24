export type ApiResponse<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};

export type Session = {
  login: string;
  name: string;
};

export type Service = {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  deadline: number;
};

export type ServiceInput = {
  name: string;
  description?: string;
  price: number;
  deadline: number;
};

export type Solicitation = {
  id: number;
  service_id: number;
  service_name: string;
  status: string;
  price: number;
  created_at: string;
  expected_date: string;
};

export type SolicitationInput = {
  service_id: number;
  status?: string;
};

export type ClientCreate = {
  email: string;
  phone?: string;
  password: string;
  name: string;
  cpf: string;
  birth_date: string;
  marital_status?: string;
  school_degree: string;
};
