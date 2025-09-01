import * as Updates from 'expo-updates';
import { useCallback, useEffect, useRef } from 'react';
import { AppState } from 'react-native';

const useAppUpdate = () => {
  const appState = useRef(AppState.currentState);

  const checkForUpdates = useCallback(async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.log('Error de update: ', error);
    }
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        checkForUpdates();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [checkForUpdates]);
};

export default useAppUpdate;