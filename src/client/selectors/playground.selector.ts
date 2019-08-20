import { GameState } from "../reducers/game.reducers";

export interface PlaygroundStoreSlice {
  isStarted?: boolean;
}

const playgroundSelectorFunction = (state: GameState): PlaygroundStoreSlice => ({
  isStarted: state.isStarted
});

export default playgroundSelectorFunction;
