import { createSelector } from "reselect";

import { GameState } from "../reducers/game.reducers";
import Player, { PlayerTurnOrder } from "../../logic/Player";
import Planet from "../../logic/Planet";
import rootGameSelector from "./root.game.selector";

export interface PlayerTurnStoreSlice {
  activePlayer: Player;
  originPlanet?: Planet;
  destinationPlanet?: Planet;
  orders: PlayerTurnOrder[];
}

const playerTurnSelectorFunction = (game: GameState): PlayerTurnStoreSlice => ({
  activePlayer: game.activePlayer as Player,
  originPlanet: game.originPlanet,
  destinationPlanet: game.destinationPlanet,
  orders: game.currentPlayerOrders
});

const playerTurnSelector = createSelector(
  rootGameSelector,
  playerTurnSelectorFunction
);

export default playerTurnSelector;
