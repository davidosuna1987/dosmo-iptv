// hooks/useEncryptedStorage.ts
import { EncryptedPassword } from '@/types';
import { useCallback } from 'react';

// const ENCTYPTED_PASSWORD_STORAGE_KEY = 'encrypted-password';
const ENCRYPTION_KEY = 'encryption-key';

export function useEncryptedPassword() {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const generateKey = useCallback(async () => {
    const key = await crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
    const exported = await crypto.subtle.exportKey('jwk', key);
    localStorage.setItem(ENCRYPTION_KEY, JSON.stringify(exported));
    return key;
  }, []);

  const loadKey = useCallback(async () => {
    const stored = localStorage.getItem(ENCRYPTION_KEY);
    if (!stored) return generateKey();
    
    const jwk = JSON.parse(stored);
    return crypto.subtle.importKey(
      'jwk',
      jwk,
      { name: 'AES-GCM' },
      true,
      ['encrypt', 'decrypt']
    );
  }, [generateKey]);

  const encrypt = useCallback(async (value: string) => {
    const key = await loadKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = encoder.encode(value);
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoded
    );
    const payload = {
      iv: Array.from(iv),
      data: Array.from(new Uint8Array(encrypted)),
    };
    // localStorage.setItem(ENCTYPTED_PASSWORD_STORAGE_KEY, JSON.stringify(payload));

    return payload;
  }, [loadKey]);

  const decrypt = useCallback(async (value: EncryptedPassword) => {
    const key = await loadKey();
    // const raw = localStorage.getItem(ENCTYPTED_PASSWORD_STORAGE_KEY);
    // if (!raw) return null;
    // const { iv, data } = JSON.parse(raw);
    const { iv, data } = value;
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: new Uint8Array(iv) },
      key,
      new Uint8Array(data)
    );
    return decoder.decode(decrypted);
  }, [loadKey]);

  return { encrypt, decrypt };
}
