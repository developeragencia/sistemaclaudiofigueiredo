import { api } from './api'

interface Pagamento {
  id: number
  fornecedor_id: number
  valor: number
  data_vencimento: string
  status: 'pendente' | 'pago' | 'atrasado'
  created_at: string
  updated_at: string
  fornecedor: {
    id: number
    nome: string
  }
}

interface CreatePagamentoData {
  fornecedor_id: number
  valor: number
  data_vencimento: string
}

export const pagamentosService = {
  async listar(): Promise<Pagamento[]> {
    const response = await api.get<Pagamento[]>('/pagamentos')
    return response.data
  },

  async obter(id: number): Promise<Pagamento> {
    const response = await api.get<Pagamento>(`/pagamentos/${id}`)
    return response.data
  },

  async criar(data: CreatePagamentoData): Promise<Pagamento> {
    const response = await api.post<Pagamento>('/pagamentos', data)
    return response.data
  },

  async atualizar(id: number, data: Partial<CreatePagamentoData>): Promise<Pagamento> {
    const response = await api.put<Pagamento>(`/pagamentos/${id}`, data)
    return response.data
  },

  async excluir(id: number): Promise<void> {
    await api.delete(`/pagamentos/${id}`)
  },

  async marcarComoPago(id: number): Promise<Pagamento> {
    const response = await api.post<Pagamento>(`/pagamentos/${id}/pagar`)
    return response.data
  }
} 