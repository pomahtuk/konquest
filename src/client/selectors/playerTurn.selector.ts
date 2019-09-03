import { createSelector } from "reselect";

import { GameState } from "../reducers/game.reducers";
import Player, { PlayerTurnOrder } from "../../logic/Player";
import Planet from "../../logic/Planet";
import rootGameSelector from "./root.game.selector";
import rootTurnSelector from "./root.turn.selector";
import { TurnStoreData } from "../reducers/turn.reducers";

export interface PlayerTurnStoreSlice {
  activePlayer: Player;
  originPlanet?: Planet;
  destinationPlanet?: Planet;
  orders: PlayerTurnOrder[];
}

const playerTurnSelectorFunction = (game: GameState, turn: TurnStoreData): PlayerTurnStoreSlice => ({
  activePlayer: game.activePlayer as Player,
  originPlanet: turn.originPlanet,
  destinationPlanet: turn.destinationPlanet,
  orders: turn.currentPlayerOrders
});

const playerTurnSelector = createSelector(
  rootGameSelector,
  rootTurnSelector,
  playerTurnSelectorFunction
);

export default playerTurnSelector;
