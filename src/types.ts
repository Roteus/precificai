// Reexport types from backend (compartilhado)
export enum Sector {
  FOOD = 'food',
  SERVICES = 'services',
  RETAIL = 'retail',
  INDUSTRY = 'industry',
  OTHER = 'other'
}

export interface RawMaterial {
  name: string;
  quantityUsed: number;
  unitUsed: string;
  totalQuantity: number;
  totalUnit: string;
  totalCost: number;
}

export interface UtilityCost {
  enabled: boolean;
  consumption: number;
  unit: string;
  totalBill?: number;
  totalConsumption?: number;
}

export interface CostBreakdown {
  rawMaterials: number;
  utilities: {
    energy: number;
    water: number;
    gas: number;
  };
  labor: number;
  packaging: number;
  taxes: number;
  fixedCosts: number;
  total: number;
}

export interface PricingRequest {
  productName: string;
  sector: Sector;
  quantity: number;
  rawMaterials: RawMaterial[];
  utilities: {
    energy?: UtilityCost;
    water?: UtilityCost;
    gas?: UtilityCost;
  };
  labor?: number;
  packaging?: number;
  taxes?: number;
  fixedCosts?: number;
  profitMargin?: number;
}

export interface PricingResponse {
  productName: string;
  costBreakdown: CostBreakdown;
  suggestedMargin: number;
  appliedMargin: number;
  totalCost: number;
  finalPrice: number;
  pricePerUnit: number;
  markup: number;
}

export interface SectorOption {
  value: Sector;
  label: string;
  suggestedMargin: number;
}
