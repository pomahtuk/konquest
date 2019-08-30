import React, { useEffect, ReactElement } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import ConquestGame from "../../logic/Game";
import getPlanetLimit from "../../logic/helpers/getPlanetLimit";

import { setGameOptions, startGame } from "../actions/game.actions";
import gameSettingsSelectorFunction, { SettingsStoreSlice } from "../selectors/gameSettings.selector";

import useSlider from "../hooks/useSlider";
import Button from "./foundations/Button";
import InputText from "./foundations/InputText";

const GameSettings = (): ReactElement => {
  const dispatch = useDispatch();
  // get data from redux
  const {
    gameOptions: { fieldSize, neutralPlanetCount },
    players
  }: SettingsStoreSlice = useSelector(gameSettingsSelectorFunction, shallowEqual);

  // use it for inputs
  const { value: fieldSizeValue, onChange: changeFieldSize } = useSlider(fieldSize);
  const { value: neutralPlanetsValue, onChange: changeNeutral, setValue } = useSlider(neutralPlanetCount);

  const maxPlanets = getPlanetLimit((fieldSizeValue as number) ** 2, players.length);

  useEffect((): void => {
    if (neutralPlanetsValue > maxPlanets) {
      setValue(maxPlanets);
    }
  }, [neutralPlanetsValue, maxPlanets, setValue]);

  const changeSettings = (): void => {
    dispatch(
      setGameOptions({
        fieldSize: fieldSizeValue as number,
        neutralPlanetCount: neutralPlanetsValue as number
      })
    );
    dispatch(startGame());
  };

  return (
    <React.Fragment>
      <h1 style={{ marginTop: 0 }}>Game settings:</h1>
      <InputText
        type="number"
        label="Field size"
        value={fieldSizeValue}
        onChange={changeFieldSize}
        min={ConquestGame.minSize}
        max={ConquestGame.maxSize}
      />
      <InputText label="Neutral planets" type="number" value={neutralPlanetsValue} onChange={changeNeutral} min={0} max={maxPlanets} />

      <div className="pure-controls">
        <Button onClick={changeSettings}>Start Game</Button>
      </div>
    </React.Fragment>
  );
};

export default GameSettings;
