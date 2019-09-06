import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";

import App, { AppProps } from "./client/App";

import storeCreator, { StoreData } from "./client/stores/game.store";
import ThemeProvider from "./client/view/themes/ThemeProvider";
import baseTheme from "./client/view/themes/base.theme";
// Grab the state from a global variable injected into the server-generated HTML
const preloadedState: StoreData = window.__PRELOADED_STATE__;
const backgroundData: AppProps = window.__BACKGROUND__;
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;
delete window.__BACKGROUND__;
const store = storeCreator(preloadedState);

const el = document.getElementById("root");

function main({ node }: { node: typeof el }): void {
  hydrate(
    <Provider store={store}>
      <ThemeProvider theme={baseTheme}>
        <App {...backgroundData} />
      </ThemeProvider>
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
