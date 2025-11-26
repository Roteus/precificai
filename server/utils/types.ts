// Tipos de unidades
export enum UnitType {
  MASS = 'mass',
  VOLUME = 'volume',
  UNIT = 'unit',
  ENERGY = 'energy',
  WATER = 'water'
}

// Setores
export enum Sector {
  FOOD = 'food',
  SERVICES = 'services',
  RETAIL = 'retail',
  INDUSTRY = 'industry',
  OTHER = 'other'
}

// Matéria-prima
export interface RawMaterial {
  name: string;
  quantityUsed: number;
  unitUsed: string;
  totalQuantity: number;
  totalUnit: string;
  totalCost: number;
}

// Custo de utilidade
export interface UtilityCost {
  enabled: boolean;
  consumption: number;
  unit: string;
  totalBill?: number;
  totalConsumption?: number;
}

// Breakdown de custos
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

// Request de precificação
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

// Response de precificação
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

// Valores padrão
export interface DefaultValues {
  utilities: {
    energy: number;
    water: number;
    gas: number;
  };
  profitMargins: {
    [key in Sector]: number;
  };
}
