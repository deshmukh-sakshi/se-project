import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  getLatestMarketRates,
  getMarketRateHistory,
  updateProductMarketRate
} from '../services/marketRateScraper.js';
import { triggerMarketRateUpdate, getCronStatus } from '../services/cronJobs.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/market-rates/latest
 * Get latest market rates for all products
 */
router.get('/latest', authenticate, async (req, res) => {
  try {
    const rates = await getLatestMarketRates();
    
    res.json({
      success: true,
      rates,
      count: rates.length,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Get latest market rates error:', error);
    res.status(500).json({ error: 'Failed to fetch market rates' });
  }
});

/**
 * GET /api/market-rates/history/:productId
 * Get market rate history for a specific product
 */
router.get('/history/:productId', authenticate, async (req, res) => {
  try {
    const { productId } = req.params;
    const limit = parseInt(req.query.limit) || 30;
    
    const history = await getMarketRateHistory(productId, limit);
    
    res.json({
      success: true,
      history,
      count: history.length
    });
  } catch (error) {
    console.error('Get market rate history error:', error);
    res.status(500).json({ error: 'Failed to fetch market rate history' });
  }
});

/**
 * POST /api/market-rates/update/:productId
 * Manually update market rate for a product (Admin only)
 */
router.post('/update/:productId', authenticate, requireAdmin, [
  body('newPrice').isFloat({ min: 0 }).withMessage('New price must be a positive number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productId } = req.params;
    const { newPrice } = req.body;
    
    const product = await updateProductMarketRate(productId, parseFloat(newPrice), 'manual');
    
    res.json({
      success: true,
      message: 'Market rate updated successfully',
      product
    });
  } catch (error) {
    console.error('Update market rate error:', error);
    res.status(500).json({ error: 'Failed to update market rate' });
  }
});

/**
 * POST /api/market-rates/trigger-update
 * Manually trigger market rate update for all products (Admin only)
 */
router.post('/trigger-update', authenticate, requireAdmin, async (req, res) => {
  try {
    const result = await triggerMarketRateUpdate();
    
    res.json({
      success: true,
      message: 'Market rate update completed',
      result
    });
  } catch (error) {
    console.error('Trigger market rate update error:', error);
    res.status(500).json({ error: 'Failed to trigger market rate update' });
  }
});

/**
 * GET /api/market-rates/cron-status
 * Get cron job status (Admin only)
 */
router.get('/cron-status', authenticate, requireAdmin, (req, res) => {
  try {
    const status = getCronStatus();
    
    res.json({
      success: true,
      status
    });
  } catch (error) {
    console.error('Get cron status error:', error);
    res.status(500).json({ error: 'Failed to get cron status' });
  }
});

export default router;
