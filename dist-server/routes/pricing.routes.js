import { Router } from 'express';
import { pricingController } from '../controllers/pricing.controller.js';
const router = Router();
// POST /api/pricing/calculate - Calcula precificação
router.post('/calculate', (req, res) => pricingController.calculate(req, res));
// GET /api/pricing/defaults - Retorna valores padrão
router.get('/defaults', (req, res) => pricingController.getDefaults(req, res));
// GET /api/pricing/sectors - Retorna setores disponíveis
router.get('/sectors', (req, res) => pricingController.getSectors(req, res));
// POST /api/pricing/convert - Converte unidades
router.post('/convert', (req, res) => pricingController.convert(req, res));
export default router;
