import { Sector } from './types.js';
import { convertUnit } from './conversion.js';
import { DEFAULT_VALUES } from './constants.js';
/**
 * Calcula o custo de uma matéria-prima
 */
export function calculateRawMaterialCost(material) {
    try {
        // Converte a quantidade usada para a unidade do total
        const quantityInTotalUnit = convertUnit(material.quantityUsed, material.unitUsed, material.totalUnit);
        // Calcula o custo proporcional
        if (material.totalQuantity === 0)
            return 0;
        const costPerUnit = material.totalCost / material.totalQuantity;
        const cost = quantityInTotalUnit * costPerUnit;
        return isNaN(cost) || !isFinite(cost) ? 0 : cost;
    }
    catch (error) {
        console.error('Error calculating raw material cost:', error);
        return 0;
    }
}
/**
 * Calcula o custo total de todas as matérias-primas
 */
export function calculateTotalRawMaterialsCost(materials) {
    return materials.reduce((total, material) => {
        const cost = calculateRawMaterialCost(material);
        return total + cost;
    }, 0);
}
/**
 * Calcula o custo de uma utilidade (energia, água, gás)
 */
export function calculateUtilityCost(utility, defaultPricePerUnit) {
    if (!utility || !utility.enabled)
        return 0;
    let pricePerUnit = defaultPricePerUnit;
    // Se o usuário forneceu valores personalizados, calcula o preço por unidade
    if (utility.totalBill && utility.totalConsumption && utility.totalConsumption > 0) {
        pricePerUnit = utility.totalBill / utility.totalConsumption;
    }
    return utility.consumption * pricePerUnit;
}
/**
 * Calcula todos os custos de utilidades
 */
export function calculateUtilitiesCosts(utilities) {
    return {
        energy: calculateUtilityCost(utilities.energy, DEFAULT_VALUES.utilities.energy),
        water: calculateUtilityCost(utilities.water, DEFAULT_VALUES.utilities.water),
        gas: calculateUtilityCost(utilities.gas, DEFAULT_VALUES.utilities.gasPerKg)
    };
}
/**
 * Calcula o breakdown completo de custos
 */
export function calculateCostBreakdown(rawMaterials, utilities, labor = 0, packaging = 0, taxes = 0, fixedCosts = 0) {
    const rawMaterialsCost = calculateTotalRawMaterialsCost(rawMaterials);
    const utilitiesCosts = calculateUtilitiesCosts(utilities);
    const totalUtilities = utilitiesCosts.energy + utilitiesCosts.water + utilitiesCosts.gas;
    const total = rawMaterialsCost + totalUtilities + labor + packaging + taxes + fixedCosts;
    return {
        rawMaterials: rawMaterialsCost,
        utilities: utilitiesCosts,
        labor,
        packaging,
        taxes,
        fixedCosts,
        total
    };
}
/**
 * Calcula o preço final com base no custo e margem de lucro
 */
export function calculateFinalPrice(totalCost, profitMargin) {
    return totalCost * (1 + profitMargin / 100);
}
/**
 * Obtém a margem de lucro sugerida para um setor
 */
export function getSuggestedMargin(sector) {
    return DEFAULT_VALUES.profitMargins[sector] || DEFAULT_VALUES.profitMargins[Sector.OTHER];
}
/**
 * Calcula o markup
 */
export function calculateMarkup(finalPrice, totalCost) {
    if (totalCost === 0)
        return 0;
    return ((finalPrice - totalCost) / totalCost) * 100;
}
