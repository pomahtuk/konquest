import React, { ReactElement } from "react";
import { Provider } from "react-redux";

import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
const engine = new Styletron();

import storeCreator from "../../stores/game.store";
const store = storeCreator();

export const CurrentStore = store;

const wrapWithReduxAndStyle = (element: ReactElement): ReactElement => {
  return (
    <Provider store={store}>
      <StyletronProvider value={engine}>{element}</StyletronProvider>
    </Provider>
  );
};

export default wrapWithReduxAndStyle;
