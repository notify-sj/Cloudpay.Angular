import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, any>();

  constructor() {}

  // Set cache data
  set(key: string, data: any): void {
    this.cache.set(key, data);
  }

  // Get cache data
  get(key: string): any {
    return this.cache.get(key);
  }

  // Check if the cache contains data for the key
  has(key: string): boolean {
    return this.cache.has(key);
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }
}
