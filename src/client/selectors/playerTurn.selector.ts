import { GameState } from "../reducers/game.reducers";
import Player, { PlayerTurnOrder } from "../../logic/Player";
import Planet from "../../logic/Planet";

export interface PlayerTurnStoreSlice {
  activePlayer: Player;
  originPlanet?: Planet;
  destinationPlanet?: Planet;
  orders: PlayerTurnOrder[];
}

const playerTurnSelectorFunction = (state: GameState): PlayerTurnStoreSlice => ({
  activePlayer: state.activePlayer as Player,
  originPlanet: state.originPlanet,
  destinationPlanet: state.destinationPlanet,
  orders: state.currentPlayerOrders
});

export default playerTurnSelectorFunction;
