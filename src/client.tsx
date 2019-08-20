import App from "./client/App";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { hydrate } from "react-dom";

import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
const engine = new Styletron();

import { Provider } from "react-redux";
import storeCreator from "./client/stores/game.store";
import { GameState } from "./client/reducers/game.reducers";
import ThemeProvider from "./client/view/themes/ThemeProvider";
import baseTheme from "./client/view/themes/base.theme";
// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;
const store = storeCreator(preloadedState as GameState);

const el = document.getElementById("root");

function main({ node }: { node: typeof el }): void {
  hydrate(
    <Provider store={store}>
      <StyletronProvider value={engine}>
        <ThemeProvider theme={baseTheme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </StyletronProvider>
    </Provider>,
    node
  );
}

/* istanbul ignore next */
if (module.hot) {
  module.hot.accept();
}

main({ node: el });

export { main as default };
