/**
 * Pricing Engine for BMMS
 * Formula: (Base * Qty) - Bulk Discount + Labor + Transport + 18% GST
 */

/**
 * Calculate bulk discount based on quantity
 * @param {number} quantity - Order quantity
 * @param {number} basePrice - Base price per unit
 * @param {string} category - Product category
 * @returns {number} Discount amount
 */
export function calculateBulkDiscount(quantity, basePrice, category) {
  const subtotal = basePrice * quantity;
  
  // Bulk discount tiers based on category
  const discountRules = {
    CEMENT: [
      { minQty: 100, discount: 0.10 },  // 10% off for 100+ bags
      { minQty: 50, discount: 0.05 },   // 5% off for 50+ bags
      { minQty: 20, discount: 0.02 }    // 2% off for 20+ bags
    ],
    STEEL: [
      { minQty: 10, discount: 0.08 },   // 8% off for 10+ tons
      { minQty: 5, discount: 0.04 },    // 4% off for 5+ tons
      { minQty: 2, discount: 0.02 }     // 2% off for 2+ tons
    ],
    AGGREGATE: [
      { minQty: 50, discount: 0.07 },   // 7% off for 50+ cubic meters
      { minQty: 20, discount: 0.03 },   // 3% off for 20+ cubic meters
      { minQty: 10, discount: 0.01 }    // 1% off for 10+ cubic meters
    ],
    OTHER: [
      { minQty: 50, discount: 0.05 },   // 5% off for 50+ units
      { minQty: 20, discount: 0.02 }    // 2% off for 20+ units
    ]
  };

  const rules = discountRules[category] || [];
  
  // Find applicable discount (highest tier that matches)
  for (const rule of rules) {
    if (quantity >= rule.minQty) {
      return subtotal * rule.discount;
    }
  }
  
  return 0; // No discount
}

/**
 * Calculate labor cost based on product category and quantity
 * @param {string} category - Product category
 * @param {number} quantity - Order quantity
 * @returns {number} Labor cost
 */
export function calculateLaborCost(category, quantity) {
  // Labor cost per unit by category
  const laborRates = {
    CEMENT: 5,        // ₹5 per bag for handling
    STEEL: 200,       // ₹200 per ton for handling
    AGGREGATE: 50,    // ₹50 per cubic meter for handling
    OTHER: 10         // ₹10 per unit for handling
  };

  const rate = laborRates[category] || 0;
  return rate * quantity;
}

/**
 * Calculate transport cost based on quantity and distance
 * @param {number} quantity - Order quantity
 * @param {string} unit - Product unit
 * @param {number} distance - Distance in km (default: 10km)
 * @returns {number} Transport cost
 */
export function calculateTransportCost(quantity, unit, distance = 10) {
  // Base transport rates per unit per km
  const transportRates = {
    BAGS: 0.5,          // ₹0.5 per bag per km
    TONS: 15,           // ₹15 per ton per km
    CUBIC_METER: 8,     // ₹8 per cubic meter per km
    PIECES: 0.02        // ₹0.02 per piece per km
  };

  const rate = transportRates[unit] || 0;
  const baseCost = rate * quantity * distance;
  
  // Minimum transport charge
  const minimumCharge = 500;
  
  return Math.max(baseCost, minimumCharge);
}

/**
 * Calculate GST (18%)
 * @param {number} amount - Taxable amount
 * @returns {number} GST amount
 */
export function calculateGST(amount) {
  const GST_RATE = 0.18; // 18%
  return amount * GST_RATE;
}

/**
 * Calculate final price for an order item
 * Formula: (Base * Qty) - Bulk Discount + Labor + Transport + 18% GST
 * 
 * @param {Object} params - Pricing parameters
 * @param {number} params.basePrice - Base price per unit
 * @param {number} params.quantity - Order quantity
 * @param {string} params.category - Product category
 * @param {string} params.unit - Product unit
 * @param {number} params.distance - Delivery distance in km (optional, default: 10)
 * @returns {Object} Detailed pricing breakdown
 */
export function calculatePrice(params) {
  const { basePrice, quantity, category, unit, distance = 10 } = params;

  // Step 1: Calculate subtotal (Base * Qty)
  const subtotal = basePrice * quantity;

  // Step 2: Calculate bulk discount
  const bulkDiscount = calculateBulkDiscount(quantity, basePrice, category);

  // Step 3: Calculate labor cost
  const laborCost = calculateLaborCost(category, quantity);

  // Step 4: Calculate transport cost
  const transportCost = calculateTransportCost(quantity, unit, distance);

  // Step 5: Calculate taxable amount (before GST)
  const taxableAmount = subtotal - bulkDiscount + laborCost + transportCost;

  // Step 6: Calculate GST (18%)
  const gst = calculateGST(taxableAmount);

  // Step 7: Calculate final amount
  const finalAmount = taxableAmount + gst;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    bulkDiscount: Math.round(bulkDiscount * 100) / 100,
    laborCost: Math.round(laborCost * 100) / 100,
    transportCost: Math.round(transportCost * 100) / 100,
    taxableAmount: Math.round(taxableAmount * 100) / 100,
    gst: Math.round(gst * 100) / 100,
    finalAmount: Math.round(finalAmount * 100) / 100,
    breakdown: {
      basePrice,
      quantity,
      category,
      unit,
      distance
    }
  };
}

/**
 * Calculate price for multiple items in an order
 * @param {Array} items - Array of order items
 * @param {number} distance - Delivery distance in km
 * @returns {Object} Total pricing breakdown
 */
export function calculateOrderPrice(items, distance = 10) {
  let totalSubtotal = 0;
  let totalBulkDiscount = 0;
  let totalLaborCost = 0;
  let totalTransportCost = 0;
  let totalGST = 0;
  let totalFinalAmount = 0;

  const itemPrices = items.map(item => {
    const pricing = calculatePrice({
      basePrice: item.basePrice,
      quantity: item.quantity,
      category: item.category,
      unit: item.unit,
      distance
    });

    totalSubtotal += pricing.subtotal;
    totalBulkDiscount += pricing.bulkDiscount;
    totalLaborCost += pricing.laborCost;
    totalTransportCost += pricing.transportCost;
    totalGST += pricing.gst;
    totalFinalAmount += pricing.finalAmount;

    return {
      productId: item.productId,
      brandName: item.brandName,
      ...pricing
    };
  });

  return {
    items: itemPrices,
    totals: {
      subtotal: Math.round(totalSubtotal * 100) / 100,
      bulkDiscount: Math.round(totalBulkDiscount * 100) / 100,
      laborCost: Math.round(totalLaborCost * 100) / 100,
      transportCost: Math.round(totalTransportCost * 100) / 100,
      taxableAmount: Math.round((totalSubtotal - totalBulkDiscount + totalLaborCost + totalTransportCost) * 100) / 100,
      gst: Math.round(totalGST * 100) / 100,
      finalAmount: Math.round(totalFinalAmount * 100) / 100
    },
    distance
  };
}
