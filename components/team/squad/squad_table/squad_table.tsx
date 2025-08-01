import { SquadGroup } from '@/types/team_info';
import { Text, View } from 'react-native';
const SquadTable = ({ squad }: { squad: SquadGroup }) => {
  return (
    <View>
      <View>
        <Text>{squad.name}</Text>
      </View>
      <View>
        <View>
          {squad.rows.map((player, index) => {
            return (
              <View
                key={`${player.entity.object.name}_${player.entity.object.birthdate}`}
              >
                <View>
                  <View>
                    <Text>{player?.entity?.object?.name}</Text>
                  </View>
                  <View>
                    <Text>{player?.entity?.object?.age}</Text>
                  </View>
                  <View>
                    <Text>{player?.entity?.object?.birthdate}</Text>
                  </View>
                  <View>
                    <Text>{player?.entity?.object?.height}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default SquadTable;
