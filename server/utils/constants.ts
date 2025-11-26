import { Sector } from './types.js';

// Valores padrão do Brasil (2024)
export const DEFAULT_VALUES = {
  utilities: {
    energy: 0.85,      // R$/kWh - média brasileira
    water: 4.50,       // R$/m³ - média brasileira
    gasGLP: 120.00,    // R$/botijão 13kg
    gasPerKg: 9.23     // R$/kg (120 / 13)
  },
  profitMargins: {
    [Sector.FOOD]: 40,          // %
    [Sector.SERVICES]: 30,       // %
    [Sector.RETAIL]: 25,         // %
    [Sector.INDUSTRY]: 28,       // %
    [Sector.OTHER]: 30           // %
  }
};

// Mapeamento de unidades para tipo
export const UNIT_MAPPINGS: { [key: string]: string } = {
  // Massa
  'g': 'mass',
  'kg': 'mass',
  'ton': 'mass',
  't': 'mass',
  
  // Volume
  'ml': 'volume',
  'l': 'volume',
  'L': 'volume',
  
  // Energia
  'kwh': 'energy',
  'kWh': 'energy',
  'wh': 'energy',
  'Wh': 'energy',
  
  // Água (pode ser volume ou medida específica)
  'm3': 'water',
  'm³': 'water',
  
  // Unidade
  'un': 'unit',
  'unidade': 'unit',
  'pç': 'unit',
  'peça': 'unit',
};
