import { createSelector } from "reselect";

import { GameState } from "../reducers/game.reducers";
import rootGameSelector from "./root.game.selector";
import Player from "../../logic/Player";
import { GameStatus } from "../../logic/Game";

export interface StatsRouteStoreSlice {
  players: Player[];
  status: GameStatus;
  winner: Player | null;
}

const statsRouteSelectorFunction = (state: GameState): StatsRouteStoreSlice => ({
  players: state.activePlayers,
  status: state.status,
  winner: state.winner
});

const statsRouteSelector = createSelector(
  rootGameSelector,
  statsRouteSelectorFunction
);

export default statsRouteSelector;
