import * as Updates from 'expo-updates';
import { useState } from 'react';

export type UpdateStatus =
  | 'standby'
  | 'checking'
  | 'available'
  | 'downloading'
  | 'ready'
  | 'error'
  | 'noUpdate';

export default function useCheckUpdates() {
  const [status, setStatus] = useState<UpdateStatus>('standby');
  const [error, setError] = useState<string | null>(null);


  async function check() {
    try {
      setStatus('checking');
      setError(null);

      const checkResult = await Updates.checkForUpdateAsync();
      if (checkResult.isAvailable) {
        setStatus('available'); 
      } else {
        setStatus('noUpdate');
        console.log('Entre a no update')
      }
    } catch (err: any) {
      setError(err?.message ?? String(err));
      setStatus('error');
    }
  }

 
  async function download() {
    try {
      setStatus('downloading');
      const fetchResult = await Updates.fetchUpdateAsync();

      if (fetchResult.isNew) {
        setStatus('ready'); 
      } else {
        setStatus('noUpdate');
      }
    } catch (err: any) {
      setError(err?.message ?? String(err));
      setStatus('error');
    }
  }


  async function apply() {
    try {
      await Updates.reloadAsync();
    } catch (err: any) {
      setError(err?.message ?? String(err));
      setStatus('error');
    }
  }

  return {
    status,
    error,
    check,    
    download,  
    apply,    
  };
}
