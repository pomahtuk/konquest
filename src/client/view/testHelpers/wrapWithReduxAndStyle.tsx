import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import storeCreator from "../../stores/game.store";
import ThemeProvider from "../themes/ThemeProvider";
import baseTheme from "../themes/base.theme";
const store = storeCreator();

export const CurrentStore = store;

const wrapWithReduxAndStyle = (element: ReactElement): ReactElement => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={baseTheme}>{element}</ThemeProvider>
    </Provider>
  );
};

export default wrapWithReduxAndStyle;
