import axios from 'axios';
import { PricingRequest, PricingResponse, SectorOption } from '../types';

const API_BASE_URL = '/api/pricing';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Cliente API para comunicação com backend
 */
export const pricingApi = {
  /**
   * Calcula a precificação
   */
  async calculatePricing(data: PricingRequest): Promise<PricingResponse> {
    const response = await api.post<PricingResponse>('/calculate', data);
    return response.data;
  },
  
  /**
   * Busca valores padrão
   */
  async getDefaults(): Promise<{
    utilities: { energy: number; water: number; gas: number; gasGLP: number; gasPerKg: number };
    profitMargins: { [key: string]: number };
  }> {
    const response = await api.get('/defaults');
    return response.data;
  },
  
  /**
   * Lista setores disponíveis
   */
  async getSectors(): Promise<SectorOption[]> {
    const response = await api.get<SectorOption[]>('/sectors');
    return response.data;
  },
  
  /**
   * Converte unidades
   */
  async convertUnit(value: number, fromUnit: string, toUnit: string): Promise<number> {
    const response = await api.post<{ convertedValue: number }>('/convert', {
      value,
      fromUnit,
      toUnit
    });
    return response.data.convertedValue;
  },
  
  /**
   * Health check
   */
  async healthCheck(): Promise<{ status: string; message: string }> {
    const response = await axios.get('/health');
    return response.data;
  }
};
