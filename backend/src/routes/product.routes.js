import express from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../config/prisma.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const productValidation = [
  body('brandName').trim().notEmpty().withMessage('Brand name is required'),
  body('category').isIn(['CEMENT', 'STEEL', 'AGGREGATE', 'OTHER']).withMessage('Invalid category'),
  body('unit').isIn(['BAGS', 'TONS', 'CUBIC_METER', 'PIECES']).withMessage('Invalid unit'),
  body('stockQuantity').isFloat({ min: 0 }).withMessage('Stock quantity must be a positive number'),
  body('basePrice').isFloat({ min: 0 }).withMessage('Base price must be a positive number'),
  body('lowStockThreshold').optional().isFloat({ min: 0 }).withMessage('Low stock threshold must be positive'),
  body('description').optional().trim()
];

// Get all products (with optional filters)
router.get('/', authenticate, async (req, res) => {
  try {
    const { category, search, lowStock } = req.query;
    
    const where = {};
    
    if (category) {
      where.category = category;
    }
    
    if (search) {
      where.OR = [
        { brandName: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (lowStock === 'true') {
      where.stockQuantity = { lte: prisma.product.fields.lowStockThreshold };
    }
    
    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { marketRates: true }
        }
      }
    });
    
    res.json({ products, count: products.length });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product
router.get('/:id', authenticate, async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: {
        marketRates: {
          orderBy: { timestamp: 'desc' },
          take: 10
        }
      }
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create product (Admin only)
router.post('/', authenticate, requireAdmin, productValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { brandName, category, unit, stockQuantity, basePrice, lowStockThreshold, description } = req.body;
    
    const product = await prisma.product.create({
      data: {
        brandName,
        category,
        unit,
        stockQuantity: parseFloat(stockQuantity),
        basePrice: parseFloat(basePrice),
        lowStockThreshold: lowStockThreshold ? parseFloat(lowStockThreshold) : 10,
        description
      }
    });
    
    // Create initial market rate entry
    await prisma.marketRate.create({
      data: {
        productId: product.id,
        basePrice: parseFloat(basePrice),
        source: 'manual'
      }
    });
    
    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product (Admin only)
router.put('/:id', authenticate, requireAdmin, productValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { brandName, category, unit, stockQuantity, basePrice, lowStockThreshold, description } = req.body;
    
    const existingProduct = await prisma.product.findUnique({
      where: { id: req.params.id }
    });
    
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        brandName,
        category,
        unit,
        stockQuantity: parseFloat(stockQuantity),
        basePrice: parseFloat(basePrice),
        lowStockThreshold: lowStockThreshold ? parseFloat(lowStockThreshold) : existingProduct.lowStockThreshold,
        description
      }
    });
    
    // Create market rate entry if price changed
    if (parseFloat(basePrice) !== existingProduct.basePrice) {
      await prisma.marketRate.create({
        data: {
          productId: product.id,
          basePrice: parseFloat(basePrice),
          source: 'manual'
        }
      });
    }
    
    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Update stock quantity (Admin only)
router.patch('/:id/stock', authenticate, requireAdmin, async (req, res) => {
  try {
    const { stockQuantity } = req.body;
    
    if (stockQuantity === undefined || stockQuantity < 0) {
      return res.status(400).json({ error: 'Valid stock quantity is required' });
    }
    
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: { stockQuantity: parseFloat(stockQuantity) }
    });
    
    res.json({
      message: 'Stock updated successfully',
      product
    });
  } catch (error) {
    console.error('Update stock error:', error);
    res.status(500).json({ error: 'Failed to update stock' });
  }
});

// Delete product (Admin only)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: req.params.id }
    });
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Get low stock products (Admin only)
router.get('/alerts/low-stock', authenticate, requireAdmin, async (req, res) => {
  try {
    const products = await prisma.$queryRaw`
      SELECT * FROM products 
      WHERE stock_quantity <= low_stock_threshold
      ORDER BY stock_quantity ASC
    `;
    
    res.json({ products, count: products.length });
  } catch (error) {
    console.error('Get low stock error:', error);
    res.status(500).json({ error: 'Failed to fetch low stock products' });
  }
});

export default router;
