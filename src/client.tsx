import App from "./client/App";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { hydrate } from "react-dom";

import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";

const engine = new Styletron();
const el = document.getElementById("root");

function main({ node }: { node: typeof el }) {
  hydrate(
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BaseProvider>
    </StyletronProvider>,
    node
  );
}

/* istanbul ignore next */
if (module.hot) {
  module.hot.accept();
}

main({ node: el });

export { main as default };
