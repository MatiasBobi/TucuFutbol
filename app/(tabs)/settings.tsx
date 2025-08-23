import { Colors } from '@/constants/colors/colors';
import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const Screen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.menu_container}>
        <Link
          asChild
          href={{
            pathname: '/settings/favorites_team',
          }}
        >
          <Pressable style={styles.item_menu_container}>
            <Fontisto name="favorite" size={24} color={Colors.WHITE_GRAY} />
            <Text style={styles.menu_text_item}>Equipos favoritos</Text>
          </Pressable>
        </Link>
        <Link
          asChild
          href={{
            pathname: '/settings/updateApp',
          }}
        >
          <Pressable style={styles.item_menu_container}>
            <MaterialIcons
              name="security-update"
              size={24}
              color={Colors.WHITE_GRAY}
            />
            <Text style={styles.menu_text_item}>Actualizaciones</Text>
          </Pressable>
        </Link>
        <Pressable style={styles.item_menu_container}>
          <Entypo name="info-with-circle" size={24} color={Colors.WHITE_GRAY} />
          <Text style={styles.menu_text_item}>Informacion de la APP</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK_BLUE,
  },
  menu_container: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 16,
    marginTop: 16,
  },
  menu_text_item: {
    fontSize: 18,
    color: Colors.WHITE_GRAY,
  },
  item_menu_container: {
    width: width * 0.9,
    height: height * 0.05,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    gap: 10,
    paddingLeft: 10,
  },
});
export default Screen;
