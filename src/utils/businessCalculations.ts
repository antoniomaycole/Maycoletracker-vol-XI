/**
 * MaycoleTracker™ Volume XI - Business Calculation Utilities
 * Immediate calculation functions for business analytics
 */

export interface ProductMetrics {
  id: string;
  name: string;
  totalSpent: number;
  revenue: number;
  quantity: number;
  costPerUnit: number;
  daysInInventory: number;
}

export interface CalculationResult {
  roi: number;
  profitMargin: number;
  revenuePerUnit: number;
  profitPerUnit: number;
  inventoryTurnover: number;
  businessImpact: 'helping' | 'hurting' | 'neutral';
  recommendations: string[];
}

/**
 * Calculate ROI (Return on Investment)
 * Formula: ((Revenue - Investment) / Investment) * 100
 */
export function calculateROI(totalSpent: number, revenue: number): number {
  if (totalSpent === 0) return 0;
  return ((revenue - totalSpent) / totalSpent) * 100;
}

/**
 * Calculate Profit Margin
 * Formula: ((Revenue - Cost) / Revenue) * 100
 */
export function calculateProfitMargin(totalSpent: number, revenue: number): number {
  if (revenue === 0) return 0;
  return ((revenue - totalSpent) / revenue) * 100;
}

/**
 * Calculate Inventory Turnover
 * Formula: Cost of Goods Sold / Average Inventory Value
 */
export function calculateInventoryTurnover(costOfGoodsSold: number, averageInventoryValue: number): number {
  if (averageInventoryValue === 0) return 0;
  return costOfGoodsSold / averageInventoryValue;
}

/**
 * Calculate Days Sales Outstanding (DSO)
 * Formula: (Average Inventory / Cost of Goods Sold) * 365
 */
export function calculateDaysInInventory(averageInventory: number, dailySales: number): number {
  if (dailySales === 0) return 0;
  return averageInventory / dailySales;
}

/**
 * Determine if product is helping or hurting business
 */
export function assessBusinessImpact(roi: number, profitMargin: number, inventoryTurnover: number): 'helping' | 'hurting' | 'neutral' {
  const score = (roi >= 20 ? 1 : roi >= 0 ? 0.5 : 0) +
                (profitMargin >= 20 ? 1 : profitMargin >= 0 ? 0.5 : 0) +
                (inventoryTurnover >= 4 ? 1 : inventoryTurnover >= 2 ? 0.5 : 0);
  
  if (score >= 2) return 'helping';
  if (score <= 1) return 'hurting';
  return 'neutral';
}

/**
 * Generate AI-powered recommendations based on metrics
 */
export function generateRecommendations(product: ProductMetrics, calculations: CalculationResult): string[] {
  const recommendations: string[] = [];
  
  // ROI-based recommendations
  if (calculations.roi < 0) {
    recommendations.push('URGENT: Product is losing money. Consider discontinuing or repricing.');
    recommendations.push('Review supplier costs and negotiate better pricing.');
  } else if (calculations.roi < 10) {
    recommendations.push('Low ROI detected. Consider price increases or cost reduction.');
  } else if (calculations.roi > 50) {
    recommendations.push('Excellent ROI! Consider increasing inventory levels.');
    recommendations.push('This product is a star performer - maintain current strategy.');
  }
  
  // Profit margin recommendations
  if (calculations.profitMargin < 10) {
    recommendations.push('Low profit margin. Evaluate pricing strategy and costs.');
  } else if (calculations.profitMargin > 40) {
    recommendations.push('High profit margin - excellent pricing strategy.');
  }
  
  // Inventory turnover recommendations
  if (calculations.inventoryTurnover < 2) {
    recommendations.push('Slow inventory turnover. Consider promotions or bundling.');
    recommendations.push('Review demand forecasting and reduce order quantities.');
  } else if (calculations.inventoryTurnover > 12) {
    recommendations.push('Very fast turnover. Consider increasing stock levels.');
    recommendations.push('High demand product - ensure adequate supply chain.');
  }
  
  // Cost per unit recommendations
  if (product.costPerUnit > 50) {
    recommendations.push('High-value item. Implement strict quality controls.');
    recommendations.push('Consider volume discounts from suppliers.');
  }
  
  // Quantity-based recommendations
  if (product.quantity < 10) {
    recommendations.push('Low stock levels. Monitor for stockouts.');
  } else if (product.quantity > 1000) {
    recommendations.push('High inventory levels. Monitor for obsolescence.');
  }
  
  return recommendations.slice(0, 4); // Return top 4 recommendations
}

/**
 * Comprehensive product analysis
 */
export function analyzeProduct(product: ProductMetrics): CalculationResult {
  const roi = calculateROI(product.totalSpent, product.revenue);
  const profitMargin = calculateProfitMargin(product.totalSpent, product.revenue);
  const revenuePerUnit = product.quantity > 0 ? product.revenue / product.quantity : 0;
  const profitPerUnit = revenuePerUnit - product.costPerUnit;
  const inventoryTurnover = product.daysInInventory > 0 ? 365 / product.daysInInventory : 0;
  const businessImpact = assessBusinessImpact(roi, profitMargin, inventoryTurnover);
  
  const result: CalculationResult = {
    roi,
    profitMargin,
    revenuePerUnit,
    profitPerUnit,
    inventoryTurnover,
    businessImpact,
    recommendations: []
  };
  
  result.recommendations = generateRecommendations(product, result);
  
  return result;
}

/**
 * Calculate portfolio-level metrics
 */
export interface PortfolioMetrics {
  totalSpent: number;
  totalRevenue: number;
  totalProfit: number;
  overallROI: number;
  averageProfitMargin: number;
  profitableProducts: number;
  unprofitableProducts: number;
  topPerformers: string[];
  underPerformers: string[];
}

export function analyzePortfolio(products: ProductMetrics[]): PortfolioMetrics {
  const totalSpent = products.reduce((sum, p) => sum + p.totalSpent, 0);
  const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);
  const totalProfit = totalRevenue - totalSpent;
  const overallROI = calculateROI(totalSpent, totalRevenue);
  
  // Calculate average profit margin weighted by revenue
  const totalProfitMargin = products.reduce((sum, p) => {
    const margin = calculateProfitMargin(p.totalSpent, p.revenue);
    return sum + (margin * p.revenue);
  }, 0);
  const averageProfitMargin = totalRevenue > 0 ? totalProfitMargin / totalRevenue : 0;
  
  // Count profitable vs unprofitable products
  let profitableProducts = 0;
  let unprofitableProducts = 0;
  
  const productAnalyses = products.map(p => ({
    ...p,
    analysis: analyzeProduct(p)
  }));
  
  productAnalyses.forEach(p => {
    if (p.analysis.roi > 0) {
      profitableProducts++;
    } else {
      unprofitableProducts++;
    }
  });
  
  // Identify top performers (ROI > 20%) and under performers (ROI < 0%)
  const topPerformers = productAnalyses
    .filter(p => p.analysis.roi > 20)
    .sort((a, b) => b.analysis.roi - a.analysis.roi)
    .slice(0, 5)
    .map(p => p.name);
    
  const underPerformers = productAnalyses
    .filter(p => p.analysis.roi < 0)
    .sort((a, b) => a.analysis.roi - b.analysis.roi)
    .slice(0, 5)
    .map(p => p.name);
  
  return {
    totalSpent,
    totalRevenue,
    totalProfit,
    overallROI,
    averageProfitMargin,
    profitableProducts,
    unprofitableProducts,
    topPerformers,
    underPerformers
  };
}

/**
 * Calculate cost savings potential
 */
export function calculateCostSavings(products: ProductMetrics[]): {
  potentialSavings: number;
  savingsOpportunities: Array<{
    productName: string;
    currentCost: number;
    optimizedCost: number;
    savings: number;
    action: string;
  }>;
} {
  let potentialSavings = 0;
  const savingsOpportunities: Array<{
    productName: string;
    currentCost: number;
    optimizedCost: number;
    savings: number;
    action: string;
  }> = [];
  
  products.forEach(product => {
    const analysis = analyzeProduct(product);
    
    // Look for savings opportunities
    if (analysis.roi < 10) {
      // Assume 15% cost reduction is possible through better sourcing
      const optimizedCost = product.totalSpent * 0.85;
      const savings = product.totalSpent - optimizedCost;
      
      potentialSavings += savings;
      savingsOpportunities.push({
        productName: product.name,
        currentCost: product.totalSpent,
        optimizedCost,
        savings,
        action: 'Negotiate better supplier pricing or find alternative sources'
      });
    }
    
    if (analysis.inventoryTurnover < 2) {
      // Excess inventory carrying costs
      const excessInventoryValue = product.totalSpent * 0.3; // 30% excess
      const carryingCostSavings = excessInventoryValue * 0.25; // 25% carrying cost
      
      potentialSavings += carryingCostSavings;
      savingsOpportunities.push({
        productName: product.name,
        currentCost: product.totalSpent,
        optimizedCost: product.totalSpent - carryingCostSavings,
        savings: carryingCostSavings,
        action: 'Reduce inventory levels and optimize reorder points'
      });
    }
  });
  
  return {
    potentialSavings,
    savingsOpportunities: savingsOpportunities.slice(0, 10) // Top 10 opportunities
  };
}

/**
 * Real-time calculation function for immediate task performance
 */
export function performImmediateCalculation(
  operation: 'roi' | 'profit_margin' | 'inventory_turnover' | 'business_impact',
  ...args: number[]
): number | string {
  switch (operation) {
    case 'roi':
      return calculateROI(args[0], args[1]);
    case 'profit_margin':
      return calculateProfitMargin(args[0], args[1]);
    case 'inventory_turnover':
      return calculateInventoryTurnover(args[0], args[1]);
    case 'business_impact':
      return assessBusinessImpact(args[0], args[1], args[2]);
    default:
      return 0;
  }
}

// Export all calculation functions for immediate use
// Note: functions are exported inline; no additional export list needed.