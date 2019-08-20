import React, { ReactElement } from "react";
import { useSelector } from "react-redux";

import playgroundSelectorFunction, { PlaygroundStoreSlice } from "../selectors/playground.selector";

import GameField from "./GameField";
import GameSettings from "./GameSettings";
import PlayerSettings from "./PlayerSettings";
import PlayerTurn from "./PlayerTurn";
import ArrivingFleets from "./ArrivingFleets";

const Playground = (): ReactElement => {
  const { isStarted }: PlaygroundStoreSlice = useSelector(playgroundSelectorFunction);
  return (
    <div>
      {!isStarted ? (
        <div className="pure-g">
          <div className="pure-u-1-2">
            <PlayerSettings />
          </div>
          <div className="pure-u-1-2">
            <GameSettings />
          </div>
        </div>
      ) : (
        <PlayerTurn />
      )}
      <div className="pure-g">
        <div className="pure-u-2-3">
          <GameField />
        </div>
        <div className="pure-u-1-3">
          <ArrivingFleets />
        </div>
      </div>
    </div>
  );
};

export default Playground;
