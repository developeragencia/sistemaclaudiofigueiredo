import { api } from './api'

interface Cliente {
  id: number
  nome: string
  email: string
  telefone: string
  created_at: string
  updated_at: string
}

interface CreateClienteData {
  nome: string
  email: string
  telefone: string
}

export const clientesService = {
  async listar(): Promise<Cliente[]> {
    const response = await api.get<Cliente[]>('/clientes')
    return response.data
  },

  async obter(id: number): Promise<Cliente> {
    const response = await api.get<Cliente>(`/clientes/${id}`)
    return response.data
  },

  async criar(data: CreateClienteData): Promise<Cliente> {
    const response = await api.post<Cliente>('/clientes', data)
    return response.data
  },

  async atualizar(id: number, data: Partial<CreateClienteData>): Promise<Cliente> {
    const response = await api.put<Cliente>(`/clientes/${id}`, data)
    return response.data
  },

  async excluir(id: number): Promise<void> {
    await api.delete(`/clientes/${id}`)
  }
} 