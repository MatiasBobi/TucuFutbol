import {
  GameInfoItem,
  RecentForm,
  Standings,
  head_to_head,
} from '@/types/game_info';
import { StyleSheet, View } from 'react-native';
import MatchGameInfo from './match_game_info/matchGameInfo';
import MatchResults from './match_results/matchResults';
import MatchStandings from './match_standings/matchStandings';
import MatchVersus from './match_versus/matchVersus';

type teamInfo = {
  name: string;
  id: string | undefined;
};
const MatchInfoAndHistory = ({
  game_info,
  headtohead,
  recent,
  standings,
  team1Info,
  team2Info,
}: {
  game_info: GameInfoItem[] | undefined;
  headtohead: head_to_head | undefined;
  recent: RecentForm | undefined;
  standings: Standings | undefined;
  team1Info: teamInfo;
  team2Info: teamInfo;
}) => {
  return (
    <View>
      {standings && <MatchStandings standings={standings} />}
      {recent && (
        <MatchResults
          recent={recent}
          team1Info={team1Info}
          team2Info={team2Info}
        />
      )}
      {headtohead && (
        <MatchVersus
          headtohead={headtohead}
          team1Info={team1Info}
          team2Info={team2Info}
        />
      )}
      {game_info && <MatchGameInfo game_info={game_info} />}
    </View>
  );
};

const styles = StyleSheet.create({});

export default MatchInfoAndHistory;
