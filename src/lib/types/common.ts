/**
 * Shared types for the Gatherly application
 * These types are used across multiple features
 */

// Base entity type with common fields
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Multi-tenant entity (all data models must include tenantId)
export interface TenantEntity extends BaseEntity {
  tenantId: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Indonesian specific types
export type PaymentMethod = 'qris' | 'gopay' | 'ovo' | 'dana' | 'bank_transfer' | 'credit_card';

export interface PaymentGateway {
  createCharge(params: CreateChargeParams): Promise<CreateChargeResult>;
  handleWebhook(payload: unknown): Promise<WebhookResult>;
}

export interface CreateChargeParams {
  amount: number;
  currency: 'IDR';
  paymentMethod: PaymentMethod;
  description: string;
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  };
}

export interface CreateChargeResult {
  chargeId: string;
  paymentUrl?: string;
  qrCode?: string;
  status: 'pending' | 'paid' | 'failed' | 'expired';
}

export interface WebhookResult {
  chargeId: string;
  status: 'paid' | 'failed' | 'expired';
  paidAt?: Date;
}
