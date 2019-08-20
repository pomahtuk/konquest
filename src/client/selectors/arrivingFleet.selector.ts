import { GameState, ArrivingFleet } from "../reducers/game.reducers";

export interface ArrivingFleetsStoreSlice {
  currentPlayerFleets: ArrivingFleet[];
}

const arrivingFleetSelectorFunction = (state: GameState): ArrivingFleetsStoreSlice => ({
  currentPlayerFleets: state.currentPlayerFleets
});

export default arrivingFleetSelectorFunction;
