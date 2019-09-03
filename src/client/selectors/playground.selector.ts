import { createSelector } from "reselect";

import { GameState } from "../reducers/game.reducers";
import rootGameSelector from "./root.game.selector";

export interface PlaygroundStoreSlice {
  isStarted?: boolean;
}

const playgroundSelectorFunction = (state: GameState): PlaygroundStoreSlice => ({
  isStarted: state.isStarted
});

const playgroundSelector = createSelector(
  rootGameSelector,
  playgroundSelectorFunction
);

export default playgroundSelector;
