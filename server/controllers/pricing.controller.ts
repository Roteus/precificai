import { Request, Response } from 'express';
import { pricingService } from '../services/pricing.service.js';
import { PricingRequest } from '../utils/types.js';
import { convertUnit, canConvert } from '../utils/conversion.js';

/**
 * Controller para endpoints de precificação
 */
export class PricingController {
  /**
   * POST /api/pricing/calculate
   * Calcula a precificação completa
   */
  calculate(req: Request, res: Response) {
    try {
      const request: PricingRequest = req.body;
      
      // Validação básica
      if (!request.productName || !request.sector) {
        return res.status(400).json({
          error: 'Product name and sector are required'
        });
      }
      
      const result = pricingService.calculatePricing(request);
      
      return res.json(result);
    } catch (error) {
      console.error('Error calculating pricing:', error);
      return res.status(500).json({
        error: 'Failed to calculate pricing',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
  
  /**
   * GET /api/pricing/defaults
   * Retorna valores padrão
   */
  getDefaults(req: Request, res: Response) {
    try {
      const defaults = pricingService.getDefaultValues();
      return res.json(defaults);
    } catch (error) {
      console.error('Error getting defaults:', error);
      return res.status(500).json({
        error: 'Failed to get default values'
      });
    }
  }
  
  /**
   * GET /api/pricing/sectors
   * Retorna setores disponíveis
   */
  getSectors(req: Request, res: Response) {
    try {
      const sectors = pricingService.getSectors();
      return res.json(sectors);
    } catch (error) {
      console.error('Error getting sectors:', error);
      return res.status(500).json({
        error: 'Failed to get sectors'
      });
    }
  }
  
  /**
   * POST /api/pricing/convert
   * Converte unidades
   */
  convert(req: Request, res: Response) {
    try {
      const { value, fromUnit, toUnit } = req.body;
      
      if (value === undefined || !fromUnit || !toUnit) {
        return res.status(400).json({
          error: 'value, fromUnit, and toUnit are required'
        });
      }
      
      if (!canConvert(fromUnit, toUnit)) {
        return res.status(400).json({
          error: `Cannot convert from ${fromUnit} to ${toUnit}`
        });
      }
      
      const convertedValue = convertUnit(Number(value), fromUnit, toUnit);
      
      return res.json({ convertedValue });
    } catch (error) {
      console.error('Error converting units:', error);
      return res.status(500).json({
        error: 'Failed to convert units',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

export const pricingController = new PricingController();
