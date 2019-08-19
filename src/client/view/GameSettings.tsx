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
    <form className="pure-form pure-form-aligned">
      <fieldset>
        <div className="pure-control-group">
          <label htmlFor="fieldSize">Field size</label>
          <input
            id="fieldSize"
            type="number"
            value={fieldSizeValue}
            onChange={changeFieldSize}
            min={ConquestGame.minSize}
            max={ConquestGame.maxSize}
            required
          />
        </div>
        <div className="pure-control-group">
          <label htmlFor="neutralPlanets">Neutral planets</label>
          <input id="neutralPlanets" type="number" value={neutralPlanetsValue} onChange={changeNeutral} min={0} max={maxPlanets} required />
        </div>

        <div className="pure-controls">
          <button className="pure-button pure-button-primary" onClick={changeSettings}>
            Start Game
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default GameSettings;
