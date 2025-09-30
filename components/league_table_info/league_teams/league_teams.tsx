import { useGetTeams } from "@/hooks/getImagesTeam/useGetTeams";
import { BracketStage, TableGroup } from "@/types/league_full_info";
import { Dimensions, StyleSheet, View } from "react-native";
import { TeamLink } from "./team/team_link";

const { height } = Dimensions.get("window"); // Dimensiones del dispositivo.

export const LeagueTeams = ({
  teams,
  typeInfo,
}: {
  teams: TableGroup[] | BracketStage[];
  typeInfo: "table" | "brackets";
}) => {
  /* Interfaz para el array que recibimos de los equipos, */
  interface teams_types {
    id: string;
    name: string;
    short_name: string;
    url_name: string | undefined;
  }

  /* Extraer los equipos y separarlos si es por grupos o por brackets, brackets es en caso de que la liga no contenga grupos por ejemplo Copa Argentina. */
  let allTeams: teams_types[] = useGetTeams(
    teams as TableGroup[],
    teams as BracketStage[],
    typeInfo
  );

  /* Render de los equipos */
  const renderItem = ({ item }: { item: teams_types }) => (
    <View style={styles.team_info}>
      <TeamLink id={item.id} team_name={item.short_name} />
    </View>
  );

  return (
    <View style={styles.container}>
      {allTeams.map((item) => {
        return <View key={item.id}>{renderItem({ item })}</View>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  team_info: {
    height: height * 0.15,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 0,
  },
});
export default LeagueTeams;
