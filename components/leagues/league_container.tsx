import { Colors } from '@/constants/colors/colors';
import { Category } from '@/types/league_list';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
export default function League_table_headers({ league }: { league: Category }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <View style={styles.league_container}>
      <Pressable
        style={[
          styles.league_open_modal_container,
          {
            borderBottomWidth: isOpen ? 1 : 0,
            borderBottomColor: Colors.YELLOW_LIGHT,
          },
        ]}
        onPress={handleOpenModal}
      >
        <Text style={styles.league_name}>{league.name}</Text>
      </Pressable>
      <View
        style={[
          styles.league_subcategories,
          { display: isOpen ? 'flex' : 'none' },
        ]}
      >
        {league.sub_categories.map((subcategory, index) => (
          <Link
            href={{
              pathname: '/league/[league]',
              params: {
                league: subcategory.id,
                url_name: subcategory.url_name,
              },
            }}
            key={subcategory.id}
            asChild
          >
            <Pressable style={styles.league_subcategory_container}>
              <Image
                source={{
                  uri: `https://api.promiedos.com.ar/images/league/${subcategory?.id}/2`,
                }}
                style={{ width: 51, height: 60 }}
                resizeMode="center"
              />
              <Text style={styles.league_subcategory}>{subcategory.name}</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  league_container: {
    padding: 20,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 20,
  },
  league_open_modal_container: {
    width: '100%',
  },
  league_name: {
    fontSize: 28,
    color: Colors.YELLOW_LIGHT,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  league_subcategories: {
    marginTop: 30,
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  league_subcategory_container: {
    backgroundColor: Colors.DARK_BLUE,
    padding: 10,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: Colors.YELLOW_LIGHT,
  },
  league_subcategory: {
    fontSize: 18,
    backgroundColor: Colors.DARK_BLUE,
    color: Colors.YELLOW_LIGHT,
    padding: 10,
    fontWeight: 'bold',
  },
});
