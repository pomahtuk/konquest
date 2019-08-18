import React, { ReactElement } from "react";
import { useSelector } from "react-redux";

import GameField from "./GameField";
import GameSettings from "./GameSettings";
import PlayerSettings from "./PlayerSettings";
import { GameState } from "../reducers/game.reducers";
import PlayerTurn from "./PlayerTurn";

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
      {!isStarted ? (
        <React.Fragment>
          <PlayerSettings />
          <GameSettings />
        </React.Fragment>
      ) : (
        <PlayerTurn />
      )}
      <GameField />
    </div>
  );
};

export default Playground;
