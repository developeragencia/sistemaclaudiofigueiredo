
import { CNPJAPIResponse } from '../types';
import { toast } from '@/hooks/use-toast';

const CNPJ_API_KEY = 'l7voA9Wjb7XLFe0nUVjCmrwEXV5wK076D7XFVx4M3Z27'; // Production code should use environment variables
const CNPJ_API_URL = 'https://www.cnpj.ws/api';

/**
 * Fetches company information from CNPJ.WS API
 * @param cnpj The CNPJ to lookup (only numbers)
 * @returns Company information or null if not found
 */
export const fetchCompanyInfoFromCNPJ = async (cnpj: string): Promise<CNPJAPIResponse | null> => {
  try {
    // Clean up CNPJ format (remove special characters)
    const cleanCNPJ = cnpj.replace(/[^\d]/g, '');
    
    // Validate CNPJ length
    if (cleanCNPJ.length !== 14) {
      toast({
        title: "CNPJ inválido",
        description: "O CNPJ deve conter 14 dígitos",
        variant: "destructive",
      });
      return null;
    }
    
    const response = await fetch(`${CNPJ_API_URL}/cnpj/${cleanCNPJ}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CNPJ_API_KEY}`,
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        toast({
          title: "CNPJ não encontrado",
          description: "Não foi possível encontrar informações para este CNPJ",
          variant: "destructive",
        });
        return null;
      }
      
      const errorData = await response.json();
      toast({
        title: "Erro na consulta de CNPJ",
        description: errorData.message || "Não foi possível consultar o CNPJ",
        variant: "destructive",
      });
      return null;
    }
    
    const data = await response.json();
    
    if (data.erro) {
      toast({
        title: "Erro na consulta de CNPJ",
        description: data.message || "Não foi possível consultar o CNPJ",
        variant: "destructive",
      });
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Erro ao consultar CNPJ:", error);
    toast({
      title: "Erro ao conectar com a API",
      description: "Não foi possível conectar com o serviço de consulta de CNPJ",
      variant: "destructive",
    });
    return null;
  }
};

/**
 * Maps CNPJ API response to supplier object format
 * @param apiResponse The API response from CNPJ.WS
 * @returns Formatted supplier object
 */
export const mapCNPJResponseToSupplier = (apiResponse: CNPJAPIResponse) => {
  return {
    id: crypto.randomUUID(),
    cnpj: apiResponse.cnpj,
    name: apiResponse.nome,
    tradeName: apiResponse.fantasia || undefined,
    activityCode: apiResponse.atividade_principal?.[0]?.code,
    activityDescription: apiResponse.atividade_principal?.[0]?.text,
    address: apiResponse.logradouro ? 
      `${apiResponse.logradouro}${apiResponse.numero ? `, ${apiResponse.numero}` : ''}${apiResponse.complemento ? `, ${apiResponse.complemento}` : ''}` : 
      undefined,
    city: apiResponse.municipio || undefined,
    state: apiResponse.uf || undefined,
    zipCode: apiResponse.cep || undefined,
    phone: apiResponse.telefone || undefined,
    email: apiResponse.email || undefined,
    taxRegime: apiResponse.regime_tributario || undefined,
    createdAt: new Date(),
    updatedAt: new Date()
  };
};
