import React, { ReactElement } from "react";

import PlanetElement from "./Planet";
import { useSelector, shallowEqual } from "react-redux";
import gameSelectorFunction, { GameStoreSlice } from "../selectors/game.selector";

const GameField = (): ReactElement | null => {
  const { planets, fieldSize }: GameStoreSlice = useSelector(gameSelectorFunction, shallowEqual);

  if (!planets) {
    return null;
  }

  console.log("field re-render");

  return (
    <div
      style={{
        width: fieldSize * 60,
        height: fieldSize * 60,
        position: "relative"
      }}
    >
      {Object.keys(planets).map((planetName) => {
        const planet = planets[planetName];
        return <PlanetElement key={planetName + planet.ships} planet={planet} />;
      })}
    </div>
  );
};

export default GameField;
