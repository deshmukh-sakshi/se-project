export type UserRole = 'ADMIN' | 'CUSTOMER';

export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';

export type ProductCategory = 'CEMENT' | 'STEEL' | 'SAND' | 'AGGREGATE' | 'BRICKS' | 'OTHER';

export type ProductUnit = 'BAGS' | 'TONS' | 'CUBIC_METER' | 'PIECES';

export interface User {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  brandName: string;
  category: ProductCategory;
  unit: ProductUnit;
  stockQuantity: number;
  basePrice: number;
  description?: string;
  lowStockThreshold: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  finalAmount: number;
  orderDate: string;
  completedAt?: string;
  notes?: string;
  user?: User;
  orderItems?: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  priceAtOrder: number;
  subtotal: number;
  product?: Product;
}
