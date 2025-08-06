"use client";

import { useState, useEffect, useCallback } from 'react';
import type { XtreamCredentials } from '@/domain/xtream';
import { useEncryptedPassword } from './use-encrypted-password';

const XTREAM_CREDENTIALS_KEY = 'xtream-credentials';

export function useXtreamCredentials() {
  const [credentials, setCredentials] = useState<XtreamCredentials | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(XTREAM_CREDENTIALS_KEY);
      if (item) {
        setCredentials(JSON.parse(item));
      }
    } catch (error) {
      console.error('Failed to parse credentials from localStorage', error);
      // Ensure we always have a value to avoid infinite loading
      setCredentials(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveCredentials = useCallback((credentials: XtreamCredentials) => {
    try {
      window.localStorage.setItem(XTREAM_CREDENTIALS_KEY, JSON.stringify(credentials));
      setCredentials(credentials);
    } catch (error) {
      console.error('Failed to save credentials to localStorage', error);
    }
  }, []);

  const clearCredentials = useCallback(() => {
    try {
      window.localStorage.removeItem(XTREAM_CREDENTIALS_KEY);
      setCredentials(null);
    } catch (error) {
      console.error('Failed to clear credentials from localStorage', error);
    }
  }, []);
  
  return { credentials, saveCredentials, clearCredentials, isLoading };
}