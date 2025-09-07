'use client';

import { useState, useCallback } from 'react';
import { logger } from '@/lib/logger';

interface UseLocalStorageOptions<T> {
  fallback?: T;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
}

export function useLocalStorage<T>(
  key: string, 
  initialValue: T,
  options: UseLocalStorageOptions<T> = {}
) {
  const {
    fallback = initialValue,
    serialize = JSON.stringify,
    deserialize = JSON.parse
  } = options;

  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      
      const item = window.localStorage.getItem(key);
      return item ? deserialize(item) : initialValue;
    } catch {
      // If error reading localStorage, return fallback
      return fallback;
    }
  });

  // Return a wrapped version of useState's setter function that persists to localStorage
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function for the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, serialize(valueToStore));
      }
    } catch (error) {
      // Silent fail - don't break the app if localStorage fails
      if (process.env.NODE_ENV === 'development') {
        logger.warn(`Failed to save to localStorage (key: ${key})`, error);
      }
    }
  }, [key, serialize, storedValue]);

  // Clear storage for this key
  const clearValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        logger.warn(`Failed to clear localStorage (key: ${key})`, error);
      }
    }
  }, [key, initialValue]);

  return [storedValue, setValue, clearValue] as const;
}

// Safe async operations hook
export function useAsyncOperation<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(async (operation: () => Promise<T>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await operation();
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return { loading, error, data, execute, reset };
}
