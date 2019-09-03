import { createSelector } from "reselect";

import Player from "../../logic/Player";
import { GameState } from "../reducers/game.reducers";
import Planet from "../../logic/Planet";
import rootGameSelector from "./root.game.selector";

export interface PlanetStoreSlice {
  originPlanet?: Planet;
  activePlayer: Player;
  destinationPlanet?: Planet;
  currentShipsModifier: {
    [key: string]: number;
  };
}

const planetSelectorFunction = (game: GameState): PlanetStoreSlice => ({
  originPlanet: game.originPlanet,
  activePlayer: game.activePlayer as Player,
  destinationPlanet: game.destinationPlanet,
  currentShipsModifier: game.currentShipsModifier
});

const planetSelector = createSelector(
  rootGameSelector,
  planetSelectorFunction
);

export default planetSelector;
