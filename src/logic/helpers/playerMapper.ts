import ComputerPlayer, { ComputerPlayerType } from "../ComputerPlayer";
import Player from "../Player";
import ComputerPlayerEasy from "../ComputerPlayerEasy";
import ComputerPlayerNormal from "../ComputerPlayerNormal";
import ComputerPlayerHard from "../ComputerPlayerHard";

const playerMapper = (player: Player | ComputerPlayer, preserveStats = false): Player | ComputerPlayer => {
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

  newPlayer.id = player.id;

  if (preserveStats) {
    newPlayer.statShipCount = player.statShipCount;
    newPlayer.statEnemyFleetsDestroyed = player.statEnemyFleetsDestroyed;
    newPlayer.statEnemyShipsDestroyed = player.statEnemyShipsDestroyed;
  }

  return newPlayer;
};

export default playerMapper;
