import React, { ReactElement, useState, useContext, useRef, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { css } from "emotion";

import PlanetElement from "./Planet";
import { startGame, StartGameAction } from "../actions/game.actions";
import gameSelector, { GameStoreSlice } from "../selectors/game.selector";
import Button from "./foundations/Button";
import { ThemeContext } from "./themes/ThemeProvider";
import hexToRgba from "./helpers/hexToRgba";
import { clearTurnData } from "../actions/turn.actions";

const GameField = (): ReactElement | null => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [blockSize, setBlockSize] = useState(60);
  const { isStarted, iteration, planets, fieldSize }: GameStoreSlice = useSelector(gameSelector, shallowEqual);

  useEffect(() => {
    if (wrapperRef.current) {
      setBlockSize(Math.floor(wrapperRef.current.clientWidth / fieldSize));
    }
  }, [wrapperRef, fieldSize]);

  if (!planets || !isStarted) {
    return null;
  }

  const fillColor = hexToRgba(theme.colors.white, "0.15");

  return (
    <div ref={wrapperRef}>
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
      <Button
        variant="destructive"
        onClick={(): void => {
          dispatch(clearTurnData());
          dispatch(startGame());
        }}
      >
        Restart game
      </Button>
    </div>
  );
};

export default GameField;
