import { createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import konquestGame, { GameState } from "../reducers/game.reducers";

const storeCreator = (gameState?: GameState): Store =>
  /* istanbul ignore next */
  createStore(konquestGame, gameState, process.browser && process.env.NODE_ENV !== "production" ? composeWithDevTools() : undefined);

export default storeCreator;
