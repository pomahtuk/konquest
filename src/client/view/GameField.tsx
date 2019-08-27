import React, { ReactElement, useState, useContext } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { css } from "emotion";

import PlanetElement from "./Planet";
import { startGame, StartGameAction } from "../actions/game.actions";
import gameSelectorFunction, { GameStoreSlice } from "../selectors/game.selector";
import Button from "./foundations/Button";
import { ThemeContext } from "./themes/ThemeProvider";
import hexToRgba from "./helpers/hexToRgba";

const GameField = (): ReactElement | null => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { isStarted, iteration, planets, fieldSize }: GameStoreSlice = useSelector(gameSelectorFunction, shallowEqual);

  // TODO: calculate relative size
  const [blockSize] = useState(document ? Math.floor((document.body.clientWidth * 0.5) / fieldSize) : 60);

  if (!planets || !isStarted) {
    return null;
  }

  const fillColor = hexToRgba(theme.colors.white, "0.3");

  return (
    <React.Fragment>
      <div
        className={css`
          width: ${fieldSize * blockSize}px;
          height: ${fieldSize * blockSize}px;
          position: relative;
          border: 1px solid ${theme.colors.black};
          background: repeating-linear-gradient(
              90deg,
              rgba(${fillColor}),
              rgba(${fillColor}) ${blockSize - 1}px,
              ${theme.colors.black} ${blockSize - 1}px,
              ${theme.colors.black} ${blockSize}px
            ),
            repeating-linear-gradient(
              0deg,
              rgba(${fillColor}),
              rgba(${fillColor}) ${blockSize - 1}px,
              ${theme.colors.black} ${blockSize - 1}px,
              ${theme.colors.black} ${blockSize}px
            );
        `}
      >
        {Object.keys(planets).map((planetName) => {
          const planet = planets[planetName];
          return <PlanetElement key={planetName + iteration} planet={planet} blockSize={blockSize} />;
        })}
      </div>
      <Button variant="destructive" onClick={(): StartGameAction => dispatch(startGame())}>
        Restart game
      </Button>
    </React.Fragment>
  );
};

export default GameField;
