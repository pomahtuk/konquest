import ComputerPlayer, { ComputerPlayerType } from "../ComputerPlayer";
import Player from "../Player";
import ComputerPlayerEasy from "../ComputerPlayerEasy";
import ComputerPlayerNormal from "../ComputerPlayerNormal";
import ComputerPlayerHard from "../ComputerPlayerHard";

export interface PlayerMapDefinition {
  screenName: string;
  isComputer: boolean;
  computerType: ComputerPlayerType;
}

const playerMapper = (player: Player | ComputerPlayer | PlayerMapDefinition, preserveStats = false): Player | ComputerPlayer => {
  let newPlayer: Player | ComputerPlayer;
  if (player.isComputer) {
    switch ((player as ComputerPlayer).computerType) {
      case ComputerPlayerType.EASY:
        newPlayer = new ComputerPlayerEasy(player.screenName);
        break;

      case ComputerPlayerType.NORMAL:
        newPlayer = new ComputerPlayerNormal(player.screenName);
        break;

      default:
        newPlayer = new ComputerPlayerHard(player.screenName);
        break;
    }
  } else {
    newPlayer = new Player(player.screenName);
  }

  const playerReal = player as Player;
  newPlayer.id = playerReal.id;
  if (preserveStats) {
    newPlayer.statShipCount = playerReal.statShipCount;
    newPlayer.statEnemyFleetsDestroyed = playerReal.statEnemyFleetsDestroyed;
    newPlayer.statEnemyShipsDestroyed = playerReal.statEnemyShipsDestroyed;
  }

  return newPlayer;
};

export default playerMapper;
