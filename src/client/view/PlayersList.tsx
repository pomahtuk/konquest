import React, { ReactElement, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import rootPlayersSelector from "../selectors/root.players.selector";
import Player from "../../logic/Player";
import { removePlayer } from "../actions/players.actions";
import { css } from "emotion";
import { ThemeContext } from "./themes/ThemeProvider";

const PlayersList = (): ReactElement | null => {
  const players: Player[] = useSelector(rootPlayersSelector, shallowEqual);
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);

  if (!players || players.length === 0) {
    return null;
  }

  const spanStyle = css`
    cursor: pointer;
    margin: 0 0 0 ${theme.units.medium};
    font-size: ${theme.fontSizes.smallest};
  `;

  return (
    <ul>
      {players.map((player) => (
        <li key={player.id}>
          <span>
            {player.isComputer ? "🤖" : "👨‍🚀"} {player.screenName}
          </span>
          <span className={spanStyle} onClick={() => dispatch(removePlayer(player))} data-testid="remove">
            ❌
          </span>
        </li>
      ))}
    </ul>
  );
};

export default PlayersList;
