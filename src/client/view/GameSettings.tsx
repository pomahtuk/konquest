import React, { useEffect, ReactElement } from "react";

import { Slider } from "baseui/slider";
import { Button } from "baseui/button";
import { FormControl } from "baseui/form-control";

import ConquestGame, { GameOptions } from "../../logic/Game";
import getPlanetLimit from "../../logic/utils/getPlanetLimit";
import Player from "../../logic/Player";

import useSlider from "../hooks/useSlider";

export interface GameSettingsProps {
  onChange: (options: GameOptions) => void;
}

const GameSettings = ({ onChange }: GameSettingsProps): ReactElement => {
  const fieldSizeInput = useSlider(8, true);
  const neutralPlanetsInput = useSlider(5, true);

  const defaultPlayers = [new Player("One"), new Player("Two")];
  const maxPlanets = getPlanetLimit(fieldSizeInput.value[0] ** 2, defaultPlayers.length);

  useEffect((): void => {
    const currentValue = neutralPlanetsInput.value[0];
    if (currentValue > maxPlanets) {
      neutralPlanetsInput.onChange({ value: [maxPlanets] });
    }
  });

  const changeSettings = (): void => {
    onChange({
      fieldHeight: fieldSizeInput.value[0],
      fieldWidth: fieldSizeInput.value[0],
      neutralPlanetCount: neutralPlanetsInput.value[0],
      players: defaultPlayers
    });
  };

  return (
    <React.Fragment>
      <FormControl label="Field Side size">
        <Slider {...fieldSizeInput} min={ConquestGame.minSize} max={ConquestGame.maxSize} />
      </FormControl>
      <FormControl label={`Neutral planets (max: ${maxPlanets})`}>
        <Slider {...neutralPlanetsInput} min={0} max={maxPlanets} />
      </FormControl>
      <Button onClick={changeSettings}>Start Game</Button>
    </React.Fragment>
  );
};

export default GameSettings;
