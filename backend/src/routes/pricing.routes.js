import express from 'express';
import { body, validationResult } from 'express-validator';
import { calculatePrice, calculateOrderPrice } from '../utils/pricingEngine.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

/**
 * POST /api/pricing/calculate
 * Calculate price for a single item
 */
router.post('/calculate', authenticate, [
  body('basePrice').isFloat({ min: 0 }).withMessage('Base price must be a positive number'),
  body('quantity').isFloat({ min: 0.01 }).withMessage('Quantity must be greater than 0'),
  body('category').isIn(['CEMENT', 'STEEL', 'AGGREGATE', 'OTHER']).withMessage('Invalid category'),
  body('unit').isIn(['BAGS', 'TONS', 'CUBIC_METER', 'PIECES']).withMessage('Invalid unit'),
  body('distance').optional().isFloat({ min: 0 }).withMessage('Distance must be a positive number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { basePrice, quantity, category, unit, distance } = req.body;

    const pricing = calculatePrice({
      basePrice: parseFloat(basePrice),
      quantity: parseFloat(quantity),
      category,
      unit,
      distance: distance ? parseFloat(distance) : 10
    });

    res.json({
      success: true,
      pricing
    });
  } catch (error) {
    console.error('Calculate price error:', error);
    res.status(500).json({ error: 'Failed to calculate price' });
  }
});

/**
 * POST /api/pricing/calculate-order
 * Calculate price for multiple items in an order
 */
router.post('/calculate-order', authenticate, [
  body('items').isArray({ min: 1 }).withMessage('Items must be a non-empty array'),
  body('items.*.basePrice').isFloat({ min: 0 }).withMessage('Base price must be positive'),
  body('items.*.quantity').isFloat({ min: 0.01 }).withMessage('Quantity must be greater than 0'),
  body('items.*.category').isIn(['CEMENT', 'STEEL', 'AGGREGATE', 'OTHER']).withMessage('Invalid category'),
  body('items.*.unit').isIn(['BAGS', 'TONS', 'CUBIC_METER', 'PIECES']).withMessage('Invalid unit'),
  body('distance').optional().isFloat({ min: 0 }).withMessage('Distance must be positive')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { items, distance } = req.body;

    const pricing = calculateOrderPrice(
      items.map(item => ({
        ...item,
        basePrice: parseFloat(item.basePrice),
        quantity: parseFloat(item.quantity)
      })),
      distance ? parseFloat(distance) : 10
    );

    res.json({
      success: true,
      pricing
    });
  } catch (error) {
    console.error('Calculate order price error:', error);
    res.status(500).json({ error: 'Failed to calculate order price' });
  }
});

/**
 * GET /api/pricing/bulk-discount-info
 * Get bulk discount information for all categories
 */
router.get('/bulk-discount-info', authenticate, (req, res) => {
  const discountInfo = {
    CEMENT: [
      { minQty: 100, discount: '10%', description: '100+ bags' },
      { minQty: 50, discount: '5%', description: '50-99 bags' },
      { minQty: 20, discount: '2%', description: '20-49 bags' }
    ],
    STEEL: [
      { minQty: 10, discount: '8%', description: '10+ tons' },
      { minQty: 5, discount: '4%', description: '5-9 tons' },
      { minQty: 2, discount: '2%', description: '2-4 tons' }
    ],
    AGGREGATE: [
      { minQty: 50, discount: '7%', description: '50+ cubic meters' },
      { minQty: 20, discount: '3%', description: '20-49 cubic meters' },
      { minQty: 10, discount: '1%', description: '10-19 cubic meters' }
    ],
    OTHER: [
      { minQty: 50, discount: '5%', description: '50+ units' },
      { minQty: 20, discount: '2%', description: '20-49 units' }
    ]
  };

  res.json({
    success: true,
    discountInfo,
    note: 'Bulk discounts are automatically applied based on order quantity'
  });
});

export default router;
