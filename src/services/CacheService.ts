/**
 * Cache Service - High-performance caching with MMKV
 */

import {MMKV} from 'react-native-mmkv';

const storage = new MMKV({
  id: 'spectra-cache',
  encryptionKey: 'spectra-cache-key-2024',
});

export class CacheService {
  private static readonly MAX_CACHE_SIZE = 150 * 1024 * 1024; // 150MB
  private static readonly MAX_ITEMS = 50; // LRU cache size

  /**
   * Set a value in cache
   */
  static set(key: string, value: string): void {
    try {
      storage.set(key, value);
      this.updateAccessTime(key);
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  /**
   * Get a value from cache
   */
  static get(key: string): string | undefined {
    try {
      const value = storage.getString(key);
      if (value) {
        this.updateAccessTime(key);
      }
      return value;
    } catch (error) {
      console.error('Cache get error:', error);
      return undefined;
    }
  }

  /**
   * Check if key exists in cache
   */
  static has(key: string): boolean {
    return storage.contains(key);
  }

  /**
   * Delete a value from cache
   */
  static delete(key: string): void {
    try {
      storage.delete(key);
      this.deleteAccessTime(key);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  /**
   * Clear all cache
   */
  static clear(): void {
    try {
      storage.clearAll();
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }

  /**
   * Get all keys in cache
   */
  static getAllKeys(): string[] {
    try {
      return storage.getAllKeys();
    } catch (error) {
      console.error('Cache getAllKeys error:', error);
      return [];
    }
  }

  /**
   * Get cache size in bytes
   */
  static getCacheSize(): number {
    try {
      const keys = this.getAllKeys();
      let totalSize = 0;

      keys.forEach(key => {
        const value = storage.getString(key);
        if (value) {
          totalSize += value.length;
        }
      });

      return totalSize;
    } catch (error) {
      console.error('Get cache size error:', error);
      return 0;
    }
  }

  /**
   * Get cache size in human-readable format
   */
  static getCacheSizeFormatted(): string {
    const bytes = this.getCacheSize();
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  }

  /**
   * Update access time for LRU
   */
  private static updateAccessTime(key: string): void {
    const accessKey = `_access_${key}`;
    storage.set(accessKey, Date.now().toString());
  }

  /**
   * Delete access time
   */
  private static deleteAccessTime(key: string): void {
    const accessKey = `_access_${key}`;
    storage.delete(accessKey);
  }

  /**
   * Get access time
   */
  private static getAccessTime(key: string): number {
    const accessKey = `_access_${key}`;
    const time = storage.getString(accessKey);
    return time ? parseInt(time, 10) : 0;
  }

  /**
   * Evict least recently used items
   */
  static evictLRU(): void {
    try {
      const keys = this.getAllKeys().filter(k => !k.startsWith('_access_'));

      if (keys.length <= this.MAX_ITEMS) {
        return;
      }

      // Sort by access time
      const keysWithTime = keys.map(key => ({
        key,
        time: this.getAccessTime(key),
      }));

      keysWithTime.sort((a, b) => a.time - b.time);

      // Remove oldest items
      const itemsToRemove = keysWithTime.length - this.MAX_ITEMS;
      for (let i = 0; i < itemsToRemove; i++) {
        this.delete(keysWithTime[i].key);
      }
    } catch (error) {
      console.error('LRU eviction error:', error);
    }
  }

  /**
   * Check cache size and evict if needed
   */
  static checkAndEvict(): void {
    const size = this.getCacheSize();
    if (size > this.MAX_CACHE_SIZE) {
      this.evictLRU();
    }
  }

  /**
   * Cache a filter preview
   */
  static cacheFilterPreview(imageUri: string, filterId: string, preview: string): void {
    const key = `preview_${imageUri}_${filterId}`;
    this.set(key, preview);
    this.checkAndEvict();
  }

  /**
   * Get cached filter preview
   */
  static getCachedFilterPreview(imageUri: string, filterId: string): string | undefined {
    const key = `preview_${imageUri}_${filterId}`;
    return this.get(key);
  }
}

export default CacheService;
