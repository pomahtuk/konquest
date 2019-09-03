import { createSelector } from "reselect";

import { GameState } from "../reducers/game.reducers";
import { PlanetMap } from "../../logic/Planet";
import rootGameSelector from "./root.game.selector";

export interface GameStoreSlice {
  isStarted: boolean;
  fieldSize: number;
  planets?: PlanetMap;
  iteration: number;
}
const gameSelectorFunction = (game: GameState): GameStoreSlice => ({
  isStarted: game.isStarted,
  fieldSize: game.gameOptions.fieldSize,
  iteration: game.iteration,
  planets: game.planets
});

const gameSelector = createSelector(
  rootGameSelector,
  gameSelectorFunction
);

export default gameSelector;
