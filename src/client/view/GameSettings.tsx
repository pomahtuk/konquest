import React, { useEffect, ReactElement } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import ConquestGame from "../../logic/Game";
import getPlanetLimit from "../../logic/helpers/getPlanetLimit";

import { setGameOptions, startGame } from "../actions/game.actions";
import gameSettingsSelector, { SettingsStoreSlice } from "../selectors/gameSettings.selector";

import useSlider from "../hooks/useSlider";
import Button from "./foundations/Button";
import InputText from "./foundations/InputText";

export interface GameSettingsProps {
  onStart?: () => void;
}

const GameSettings = ({ onStart }: GameSettingsProps): ReactElement => {
  const dispatch = useDispatch();
  // get data from redux
  const {
    gameOptions: { fieldSize, neutralPlanetCount },
    players
  }: SettingsStoreSlice = useSelector(gameSettingsSelector, shallowEqual);

  // use it for inputs
  const { value: fieldSizeValue, onChange: changeFieldSize, setValue: setSizeValue } = useSlider(fieldSize);
  const { value: neutralPlanetsValue, onChange: changeNeutral, setValue } = useSlider(neutralPlanetCount);

  const maxPlanets = getPlanetLimit((fieldSizeValue as number) ** 2, players.length);

  useEffect((): void => {
    if (neutralPlanetsValue > maxPlanets) {
      // make sure we are not doing negative count here
      setValue(Math.max(maxPlanets, 1));
    }
  }, [neutralPlanetsValue, maxPlanets, setValue]);

  useEffect((): void => {
    if (fieldSizeValue > ConquestGame.maxSize) {
      // make sure we are not doing negative count here
      setSizeValue(ConquestGame.maxSize);
    }
    if (fieldSizeValue < ConquestGame.minSize) {
      // make sure we are not doing negative count here
      setSizeValue(ConquestGame.minSize);
    }
  }, [fieldSizeValue, setSizeValue]);

  const changeSettings = (): void => {
    dispatch(
      setGameOptions({
        fieldSize: fieldSizeValue as number,
        neutralPlanetCount: neutralPlanetsValue as number,
        players
      })
    );
    dispatch(startGame());
    if (onStart) {
      onStart();
    }
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
        data-testid="fieldSize"
      />
      <InputText
        label="Neutral planets"
        type="number"
        value={neutralPlanetsValue}
        onChange={changeNeutral}
        min={0}
        max={maxPlanets}
        data-testid="neutralPlanets"
      />

      <Button onClick={changeSettings}>Start Game</Button>
    </React.Fragment>
  );
};

export default GameSettings;
