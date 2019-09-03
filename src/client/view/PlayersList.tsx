import React, { ReactElement } from "react";
import { useSelector, shallowEqual } from "react-redux";
import playerSettingsSelectorFunction, { PlayerSettingsStoreSlice } from "../selectors/playerSettings.selector";

const PlayersList = (): ReactElement | null => {
  const { players }: PlayerSettingsStoreSlice = useSelector(playerSettingsSelectorFunction, shallowEqual);

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
