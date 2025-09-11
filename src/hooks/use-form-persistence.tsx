'use client';

import { useCallback, useState } from 'react';

interface UseFormPersistenceOptions {
  key: string;
  clearOnSubmit?: boolean;
}

export function useFormPersistence<T extends Record<string, unknown>>(
  options: UseFormPersistenceOptions
) {
  const { clearOnSubmit = true } = options;
  const [persistedData, setPersistedData] = useState<T | null>(null);

  // Save form data
  const saveFormData = useCallback((data: T) => {
    setPersistedData(data);
  }, [setPersistedData]);

  // Clear persisted data
  const clearPersistence = useCallback(() => {
    setPersistedData(null);
  }, []);

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
