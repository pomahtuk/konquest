import React, { ReactElement } from "react";
import { useSelector, shallowEqual } from "react-redux";
import rootPlayersSelector from "../selectors/root.players.selector";
import Player from "../../logic/Player";

const PlayersList = (): ReactElement | null => {
  const players: Player[] = useSelector(rootPlayersSelector, shallowEqual);

  if (!players || players.length === 0) {
    return null;
  }

  return (
    <ul>
      {players.map((player) => (
        <li key={player.id}>
          {player.isComputer ? "🤖" : "👨‍🚀"} {player.screenName}
        </li>
      ))}
    </ul>
  );
};

export default PlayersList;
