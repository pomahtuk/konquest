import React, { useEffect } from "react";

import { Slider } from "baseui/slider";
import { Button } from "baseui/button";
import { FormControl } from "baseui/form-control";

import ConquestGame, { getPlanetLimit, GameOptions } from "../../logic/Game";
import Player from "../../logic/Player";

import useSlider from "../hooks/useSlider";

export type GameSettingsProps = {
  onChange: (options: GameOptions) => void;
};

const GameSettings = ({ onChange }: GameSettingsProps) => {
  const fieldSizeInput = useSlider(10, true);
  const neutralPlanetsInput = useSlider(4, true);

  const defaultPlayers = [new Player("One"), new Player("Two")];
  const maxPlanets = getPlanetLimit(fieldSizeInput.value[0] ** 2, defaultPlayers.length);

  useEffect(() => {
    const currentValue = neutralPlanetsInput.value[0];
    if (currentValue > maxPlanets) {
      neutralPlanetsInput.onChange({ value: [maxPlanets] });
    }
  });

  const changeSettings = () => {
    onChange({
      fieldHeight: fieldSizeInput.value[0],
      fieldWidth: fieldSizeInput.value[0],
      neutralPlanetCount: neutralPlanetsInput.value[0],
      players: defaultPlayers
    });
  };

  return (
    <>
      <FormControl label="Field Side size">
        <Slider {...fieldSizeInput} min={ConquestGame.minSize} max={ConquestGame.maxSize} />
      </FormControl>
      <FormControl label={`Neutral planets (max: ${maxPlanets})`}>
        <Slider {...neutralPlanetsInput} min={0} max={maxPlanets} />
      </FormControl>

      <Button onClick={changeSettings}>Start Game</Button>
    </>
  );
};

export default GameSettings;
