import React, { ReactElement } from "react";
import Player from "../../logic/Player";

export interface PlayersListProps {
  players: Player[];
}

const PlayersList = ({ players }: PlayersListProps): ReactElement | null =>
  players && players.length > 0 ? (
    <ul>
      {players.map((player) => (
        <li key={player.id}>{player.screenName}</li>
      ))}
    </ul>
  ) : null;

export default PlayersList;
