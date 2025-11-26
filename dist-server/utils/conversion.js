// Fatores de conversão para unidade base
const CONVERSION_FACTORS = {
    // Massa - base: kg
    mass: {
        'g': 0.001,
        'kg': 1,
        'ton': 1000,
        't': 1000
    },
    // Volume - base: L
    volume: {
        'ml': 0.001,
        'l': 1,
        'L': 1
    },
    // Energia - base: kWh
    energy: {
        'wh': 0.001,
        'Wh': 0.001,
        'kwh': 1,
        'kWh': 1
    },
    // Água - base: m³
    water: {
        'l': 0.001,
        'L': 0.001,
        'm3': 1,
        'm³': 1
    }
};
/**
 * Converte um valor de uma unidade para outra
 */
export function convertUnit(value, fromUnit, toUnit) {
    if (fromUnit === toUnit)
        return value;
    // Normalizar unidades
    const from = fromUnit.toLowerCase();
    const to = toUnit.toLowerCase();
    // Encontrar o tipo de unidade
    let unitType = null;
    for (const [type, factors] of Object.entries(CONVERSION_FACTORS)) {
        if (from in factors && to in factors) {
            unitType = type;
            break;
        }
    }
    if (!unitType) {
        throw new Error(`Cannot convert from ${fromUnit} to ${toUnit}`);
    }
    // Converter para unidade base e depois para unidade destino
    const baseValue = value * CONVERSION_FACTORS[unitType][from];
    const result = baseValue / CONVERSION_FACTORS[unitType][to];
    return result;
}
/**
 * Normaliza um valor para a unidade base do seu tipo
 */
export function normalizeToBaseUnit(value, unit) {
    const unitLower = unit.toLowerCase();
    for (const [type, factors] of Object.entries(CONVERSION_FACTORS)) {
        if (unitLower in factors) {
            return value * factors[unitLower];
        }
    }
    // Se não encontrou, retorna o valor original
    return value;
}
/**
 * Obtém a unidade base de um tipo
 */
export function getBaseUnit(unit) {
    const unitLower = unit.toLowerCase();
    for (const [type, factors] of Object.entries(CONVERSION_FACTORS)) {
        if (unitLower in factors) {
            // Retornar a primeira unidade que tem fator 1
            for (const [u, factor] of Object.entries(factors)) {
                if (factor === 1)
                    return u;
            }
        }
    }
    return unit;
}
/**
 * Verifica se uma conversão é possível
 */
export function canConvert(fromUnit, toUnit) {
    const from = fromUnit.toLowerCase();
    const to = toUnit.toLowerCase();
    for (const factors of Object.values(CONVERSION_FACTORS)) {
        if (from in factors && to in factors) {
            return true;
        }
    }
    return false;
}
