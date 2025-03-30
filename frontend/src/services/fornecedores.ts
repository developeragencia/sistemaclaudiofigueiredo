import { api } from './api'

interface Fornecedor {
  id: number
  nome: string
  cnpj: string
  email: string
  telefone: string
  created_at: string
  updated_at: string
}

interface CreateFornecedorData {
  nome: string
  cnpj: string
  email: string
  telefone: string
}

export const fornecedoresService = {
  async listar(): Promise<Fornecedor[]> {
    const response = await api.get<Fornecedor[]>('/fornecedores')
    return response.data
  },

  async obter(id: number): Promise<Fornecedor> {
    const response = await api.get<Fornecedor>(`/fornecedores/${id}`)
    return response.data
  },

  async criar(data: CreateFornecedorData): Promise<Fornecedor> {
    const response = await api.post<Fornecedor>('/fornecedores', data)
    return response.data
  },

  async atualizar(id: number, data: Partial<CreateFornecedorData>): Promise<Fornecedor> {
    const response = await api.put<Fornecedor>(`/fornecedores/${id}`, data)
    return response.data
  },

  async excluir(id: number): Promise<void> {
    await api.delete(`/fornecedores/${id}`)
  }
} 