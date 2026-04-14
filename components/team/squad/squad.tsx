import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Colors } from "@/constants/colors/colors";
import { SquadData, SquadGroup } from "@/types/team_info";
import { useCallback } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SquadTable from "./squad_table/squad_table";

const { width } = Dimensions.get("window");

export default function SquadTeam({ squad }: { squad: SquadData }) {
  const keyStractorFn = useCallback((item: SquadGroup, index: number) => {
    return `${item.name}_${index}`;
  }, []);

  const renderItem = useCallback(({ item }: { item: SquadGroup }) => {
    return <SquadTable squad={item} />;
  }, []);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header_num}>
            <Text style={styles.header_text}>#</Text>
          </View>
          <View style={styles.header_name}>
            <Text style={styles.header_text}>Jugador</Text>
          </View>
          <View style={styles.header_stat}>
            <Text style={styles.header_text}>Edad</Text>
          </View>
          <View style={styles.header_stat}>
            <Text style={styles.header_text}>Alt.</Text>
          </View>
        </View>

        <FlatList
          data={squad?.groups}
          keyExtractor={keyStractorFn}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.DARK_BLUE,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: Colors.LIGHT_BLACK,
    borderBottomWidth: 2,
    borderBottomColor: Colors.YELLOW_LIGHT,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  header_num: {
    width: width * 0.1,
    alignItems: "center",
  },
  header_name: {
    flex: 1,
    paddingLeft: 8,
  },
  header_stat: {
    width: width * 0.15,
    alignItems: "center",
  },
  header_text: {
    fontSize: RFValue(12),
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
  },
});
