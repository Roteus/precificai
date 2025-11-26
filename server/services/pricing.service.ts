import { PricingRequest, PricingResponse, Sector } from '../utils/types.js';
import {
  calculateCostBreakdown,
  calculateFinalPrice,
  getSuggestedMargin,
  calculateMarkup
} from '../utils/calculator.js';
import { DEFAULT_VALUES } from '../utils/constants.js';

/**
 * Service para cálculos de precificação
 */
export class PricingService {
  /**
   * Calcula a precificação completa
   */
  calculatePricing(request: PricingRequest): PricingResponse {
    // Calcula o breakdown de custos
    const costBreakdown = calculateCostBreakdown(
      request.rawMaterials,
      request.utilities,
      request.labor || 0,
      request.packaging || 0,
      request.taxes || 0,
      request.fixedCosts || 0
    );
    
    // Determina a margem de lucro
    const suggestedMargin = getSuggestedMargin(request.sector);
    const appliedMargin = request.profitMargin ?? suggestedMargin;
    
    // Calcula o preço final
    const finalPrice = calculateFinalPrice(costBreakdown.total, appliedMargin);
    const pricePerUnit = request.quantity > 0 ? finalPrice / request.quantity : finalPrice;
    const markup = calculateMarkup(finalPrice, costBreakdown.total);
    
    return {
      productName: request.productName,
      costBreakdown,
      suggestedMargin,
      appliedMargin,
      totalCost: costBreakdown.total,
      finalPrice,
      pricePerUnit,
      markup
    };
  }
  
  /**
   * Retorna os valores padrão
   */
  getDefaultValues() {
    return {
      utilities: DEFAULT_VALUES.utilities,
      profitMargins: DEFAULT_VALUES.profitMargins
    };
  }
  
  /**
   * Retorna os setores disponíveis
   */
  getSectors() {
    return Object.values(Sector).map(sector => ({
      value: sector,
      label: this.getSectorLabel(sector),
      suggestedMargin: DEFAULT_VALUES.profitMargins[sector]
    }));
  }
  
  /**
   * Retorna o label de um setor
   */
  private getSectorLabel(sector: Sector): string {
    const labels: { [key in Sector]: string } = {
      [Sector.FOOD]: 'Alimentos',
      [Sector.SERVICES]: 'Serviços',
      [Sector.RETAIL]: 'Varejo',
      [Sector.INDUSTRY]: 'Indústria',
      [Sector.OTHER]: 'Outro'
    };
    return labels[sector];
  }
}

export const pricingService = new PricingService();
