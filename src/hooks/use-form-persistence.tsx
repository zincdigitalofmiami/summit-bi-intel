'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './use-safe-storage';

interface UseFormPersistenceOptions {
  key: string;
  clearOnSubmit?: boolean;
}

export function useFormPersistence<T extends Record<string, unknown>>(
  options: UseFormPersistenceOptions
) {
  const { key, clearOnSubmit = true } = options;
  const [persistedData, setPersistedData, clearPersistedData] = useLocalStorage<T | null>(
    `form-${key}`,
    null
  );

  // Save form data
  const saveFormData = useCallback((data: T) => {
    setPersistedData(data);
  }, [setPersistedData]);

  // Clear persisted data
  const clearPersistence = useCallback(() => {
    clearPersistedData();
  }, [clearPersistedData]);

  // Submit handler that optionally clears persistence
  const handleSubmit = useCallback((submitCallback: () => void | Promise<void>) => {
    const result = submitCallback();
    if (clearOnSubmit) {
      clearPersistence();
    }
    return result;
  }, [clearOnSubmit, clearPersistence]);

  return {
    persistedData,
    saveFormData,
    clearPersistence,
    handleSubmit,
    hasPersisted: Boolean(persistedData && Object.keys(persistedData).length > 0)
  };
}
