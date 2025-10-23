/**
 * IAP Service - In-App Purchase management
 */

import {
  initConnection,
  endConnection,
  getProducts,
  requestPurchase,
  finishTransaction,
  getAvailablePurchases,
  Product,
  Purchase,
} from 'react-native-iap';
import type {ProductId} from '@types';

// Product IDs
export const PRODUCT_IDS = {
  FULL_UNLOCK: 'com.spectra.premium.full',
  VINTAGE_PACK: 'com.spectra.pack.vintage',
  ARTISTIC_PACK: 'com.spectra.pack.artistic',
  PROFESSIONAL_PACK: 'com.spectra.pack.professional',
} as const;

const productIds: ProductId[] = [
  PRODUCT_IDS.FULL_UNLOCK,
  PRODUCT_IDS.VINTAGE_PACK,
  PRODUCT_IDS.ARTISTIC_PACK,
  PRODUCT_IDS.PROFESSIONAL_PACK,
];

export class IAPService {
  private static initialized = false;

  /**
   * Initialize IAP connection
   */
  static async initialize(): Promise<void> {
    try {
      if (this.initialized) return;
      await initConnection();
      this.initialized = true;
      console.log('IAP initialized');
    } catch (error) {
      console.error('IAP initialization error:', error);
      throw error;
    }
  }

  /**
   * End IAP connection
   */
  static async cleanup(): Promise<void> {
    try {
      await endConnection();
      this.initialized = false;
    } catch (error) {
      console.error('IAP cleanup error:', error);
    }
  }

  /**
   * Get available products
   */
  static async getProducts(): Promise<Product[]> {
    try {
      await this.initialize();
      const products = await getProducts({skus: productIds});
      return products;
    } catch (error) {
      console.error('Get products error:', error);
      return [];
    }
  }

  /**
   * Purchase a product
   */
  static async purchase(productId: ProductId): Promise<Purchase | null> {
    try {
      await this.initialize();
      const purchase = await requestPurchase({sku: productId});

      if (purchase) {
        // Finish the transaction
        await finishTransaction({purchase, isConsumable: false});
        return purchase;
      }

      return null;
    } catch (error: any) {
      if (error.code === 'E_USER_CANCELLED') {
        console.log('Purchase cancelled by user');
        return null;
      }
      console.error('Purchase error:', error);
      throw error;
    }
  }

  /**
   * Restore previous purchases
   */
  static async restorePurchases(): Promise<Purchase[]> {
    try {
      await this.initialize();
      const purchases = await getAvailablePurchases();

      // Finish all restored transactions
      for (const purchase of purchases) {
        await finishTransaction({purchase, isConsumable: false});
      }

      return purchases;
    } catch (error) {
      console.error('Restore purchases error:', error);
      return [];
    }
  }

  /**
   * Check if user has purchased full unlock
   */
  static async hasPremiumUnlock(): Promise<boolean> {
    try {
      const purchases = await this.restorePurchases();
      return purchases.some(p => p.productId === PRODUCT_IDS.FULL_UNLOCK);
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if user has purchased a specific pack
   */
  static async hasPack(packId: ProductId): Promise<boolean> {
    try {
      const purchases = await this.restorePurchases();
      return purchases.some(p => p.productId === packId);
    } catch (error) {
      return false;
    }
  }
}

export default IAPService;
