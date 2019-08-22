import Player from "../../logic/Player";
import { GameState } from "../reducers/game.reducers";
import Planet from "../../logic/Planet";

export interface PlanetStoreSlice {
  originPlanet?: Planet;
  activePlayer: Player;
  destinationPlanet?: Planet;
  currentShipsModifier: {
    [key: string]: number;
  };
}

const planetSelectorFunction = (state: GameState): PlanetStoreSlice => ({
  originPlanet: state.originPlanet,
  activePlayer: state.activePlayer as Player,
  destinationPlanet: state.destinationPlanet,
  currentShipsModifier: state.currentShipsModifier
});

export default planetSelectorFunction;
