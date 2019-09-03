import { createSelector } from "reselect";

import Player from "../../logic/Player";
import { GameState } from "../reducers/game.reducers";
import Planet from "../../logic/Planet";
import rootGameSelector from "./root.game.selector";
import rootTurnSelector from "./root.turn.selector";
import { TurnStoreData } from "../reducers/turn.reducers";

export interface PlanetStoreSlice {
  originPlanet?: Planet;
  activePlayer: Player;
  destinationPlanet?: Planet;
  currentShipsModifier: {
    [key: string]: number;
  };
}

const planetSelectorFunction = (game: GameState, turn: TurnStoreData): PlanetStoreSlice => ({
  originPlanet: turn.originPlanet,
  activePlayer: game.activePlayer as Player,
  destinationPlanet: turn.destinationPlanet,
  currentShipsModifier: turn.currentShipsModifier
});

const planetSelector = createSelector(
  rootGameSelector,
  rootTurnSelector,
  planetSelectorFunction
);

export default planetSelector;
