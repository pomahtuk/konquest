import React, { ReactElement } from "react";
import { useSelector } from "react-redux";

import GameField from "./GameField";
import GameSettings from "./GameSettings";
import PlayerSettings from "./PlayerSettings";
import { GameState } from "../reducers/game.reducers";

interface PlaygroundStoreSlice {
  isStarted?: boolean;
}

const selectorFunction = (state: GameState): PlaygroundStoreSlice => ({
  isStarted: state.isStarted
});

const Playground = (): ReactElement => {
  const { isStarted }: PlaygroundStoreSlice = useSelector(selectorFunction);
  return (
    <div>
      {!isStarted && (
        <React.Fragment>
          <PlayerSettings />
          <GameSettings />
        </React.Fragment>
      )}
      <GameField />
    </div>
  );
};

export default Playground;
