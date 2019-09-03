import { createSelector } from "reselect";

import { GameState, ArrivingFleet } from "../reducers/game.reducers";
import rootGameSelector from "./root.game.selector";

export interface ArrivingFleetsStoreSlice {
  currentPlayerFleets: ArrivingFleet[];
}

const arrivingFleetSelectorFunction = (game: GameState): ArrivingFleetsStoreSlice => ({
  currentPlayerFleets: game.currentPlayerFleets
});

const arrivingFleetSelector = createSelector(
  rootGameSelector,
  arrivingFleetSelectorFunction
);

export default arrivingFleetSelector;
