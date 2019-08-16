import React, { useEffect, ReactElement } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import { FormGroup, Button, Slider } from "@blueprintjs/core";

import ConquestGame from "../../logic/Game";
import getPlanetLimit from "../../logic/helpers/getPlanetLimit";
import Player from "../../logic/Player";

import useSlider from "../hooks/useSlider";
import { StateGameOptions, setGameOptions, startGame, addPlayer } from "../actions/game.actions";
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
  const fieldSizeInput = useSlider(fieldSize);
  const neutralPlanetsInput = useSlider(neutralPlanetCount);

  //
  const maxPlanets = getPlanetLimit(fieldSizeInput.value ** 2, players.length);

  useEffect((): void => {
    const currentValue = neutralPlanetsInput.value;
    if (currentValue > maxPlanets) {
      neutralPlanetsInput.onChange(maxPlanets);
    }
  });

  const changeSettings = (): void => {
    if (players.length < 2) {
      dispatch(addPlayer(new Player("One")));
      dispatch(addPlayer(new Player("Two")));
    }
    dispatch(
      setGameOptions({
        fieldSize: fieldSizeInput.value,
        neutralPlanetCount: neutralPlanetsInput.value
      })
    );
    dispatch(startGame());
  };

  return (
    <React.Fragment>
      <FormGroup label="Field size">
        <Slider {...fieldSizeInput} min={ConquestGame.minSize} max={ConquestGame.maxSize} stepSize={1} labelStepSize={1} />
      </FormGroup>
      <FormGroup label="Neutral planets">
        <Slider {...neutralPlanetsInput} min={0} max={maxPlanets} stepSize={1} labelStepSize={maxPlanets} />
      </FormGroup>
      <Button intent="primary" onClick={changeSettings}>
        Start Game
      </Button>
    </React.Fragment>
  );
};

export default GameSettings;
