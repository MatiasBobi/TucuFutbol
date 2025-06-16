import { StyleSheet, View } from 'react-native';
import TableToday from '../../components/today/table_today';
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TableToday />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
});
