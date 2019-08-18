import React, { useEffect, ReactElement } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import ConquestGame from "../../logic/Game";
import getPlanetLimit from "../../logic/helpers/getPlanetLimit";
import Player from "../../logic/Player";

import useSlider from "../hooks/useSlider";
import { StateGameOptions, setGameOptions, startGame } from "../actions/game.actions";
import { GameState } from "../reducers/game.reducers";

interface SettingsStoreSlice {
  gameOptions: StateGameOptions;
  players: Player[];
}

const selectorFunction = (state: GameState): SettingsStoreSlice => ({
  gameOptions: state.gameOptions,
  players: state.players
});

const GameSettings = (): ReactElement => {
  const dispatch = useDispatch();
  // get data from redux
  const {
    gameOptions: { fieldSize, neutralPlanetCount },
    players
  }: SettingsStoreSlice = useSelector(selectorFunction, shallowEqual);

  // use it for inputs
  const { value: fieldSizeValue, onChange: changeFieldSize } = useSlider(fieldSize);
  const { value: neutralPlanetsValue, onChange: changeNeutral, setValue } = useSlider(neutralPlanetCount);

  //
  const maxPlanets = getPlanetLimit(fieldSizeValue ** 2, players.length);

  useEffect((): void => {
    if (neutralPlanetsValue > maxPlanets) {
      setValue(maxPlanets);
    }
  });

  const changeSettings = (): void => {
    dispatch(
      setGameOptions({
        fieldSize: fieldSizeValue,
        neutralPlanetCount: neutralPlanetsValue
      })
    );
    dispatch(startGame());
  };

  return (
    <React.Fragment>
      <label>
        Field size
        <br />
        <input type="number" value={fieldSizeValue} onChange={changeFieldSize} min={ConquestGame.minSize} max={ConquestGame.maxSize} />
      </label>
      <br />
      <label>
        Neutral planets
        <br />
        <input type="number" value={neutralPlanetsValue} onChange={changeNeutral} min={0} max={maxPlanets} />
      </label>
      <br />
      <button onClick={changeSettings}>Start Game</button>
    </React.Fragment>
  );
};

export default GameSettings;
