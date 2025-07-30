import { Colors } from '@/constants/colors/colors';
import { ReactNode, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AppLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true); // ⚠️ Importante para que no ocupe espacio
      StatusBar.setBackgroundColor('transparent');
    }
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK_BLUE,
  },
});
