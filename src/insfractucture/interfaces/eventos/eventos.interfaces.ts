export type EventoStatus = 'ativo' | 'inativo' | 'cancelado' | 'finalizado';

export interface IEventoPayload {
  nome: string;
  descricao?: string;
  imagem?: File;
  data_inicio: string;
  data_fim?: string;
  localizacao?: string;
  status?: EventoStatus;
}

export interface IEventoResponse {
  id: number;
  nome: string;
  descricao: string | null;
  imagem: string | null;
  data_inicio: string;
  data_fim: string | null;
  localizacao: string | null;
  status: EventoStatus;
  created_at: string;
  updated_at: string;
}

export interface IEventoCreateResponse {
  nome: string;
  descricao: string | null;
  imagem: string | null;
  data_inicio: string;
  data_fim: string | null;
  localizacao: string | null;
  status: EventoStatus;
  updated_at: string;
  created_at: string;
  id: number;
}
