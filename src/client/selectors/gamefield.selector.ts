import Planet, { PlanetMap } from "../../logic/Planet";
import Player from "../../logic/Player";
import { GameState } from "../reducers/game.reducers";

export interface GameFieldStoreSlice {
  activePlayer: Player;
  originPlanet?: Planet;
  destinationPlanet?: Planet;
  isStarted: boolean;
  fieldSize: number;
  planets: PlanetMap;
  currentShipsModifier: { [key: string]: number };
}

const gameFieldSelectorFunction = (state: GameState): GameFieldStoreSlice => ({
  activePlayer: state.activePlayer as Player,
  originPlanet: state.originPlanet,
  destinationPlanet: state.destinationPlanet,
  isStarted: state.isStarted,
  fieldSize: state.gameOptions.fieldSize,
  planets: state.planets,
  currentShipsModifier: state.currentShipsModifier
});

export default gameFieldSelectorFunction;
