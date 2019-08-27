import { GameState } from "../reducers/game.reducers";
import { PlanetMap } from "../../logic/Planet";

export interface GameStoreSlice {
  isStarted: boolean;
  fieldSize: number;
  planets?: PlanetMap;
  iteration: number;
}
const gameSelectorFunction = (state: GameState): GameStoreSlice => ({
  isStarted: state.isStarted,
  fieldSize: state.gameOptions.fieldSize,
  iteration: state.iteration,
  planets: state.planets
});

export default gameSelectorFunction;
