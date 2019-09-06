import { createSelector } from "reselect";

import { GameState } from "../reducers/game.reducers";
import rootGameSelector from "./root.game.selector";
import Player from "../../logic/Player";
import { GameStatus } from "../../logic/Game";

export interface GameRouteStoreSlice {
  isStarted: boolean;
  gameRestoreError: boolean;
  players: Player[];
  status: GameStatus;
}

const gameRouteSelectorFunction = (state: GameState): GameRouteStoreSlice => ({
  isStarted: state.isStarted,
  gameRestoreError: state.gameRestoreError,
  players: state.gameOptions.players,
  status: state.status
});

const gameRouteSelector = createSelector(
  rootGameSelector,
  gameRouteSelectorFunction
);

export default gameRouteSelector;
