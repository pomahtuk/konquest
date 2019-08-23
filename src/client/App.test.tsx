import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";

import wrapWithReduxAndStyle from "./view/testHelpers/wrapWithReduxAndStyle";

import App from "./App";

describe("<App />", (): void => {
  test("renders without exploding", (): void => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>{wrapWithReduxAndStyle(<App image={"galaxy_1"} credit={{ title: "", credit: "", link: "" }} />)}</MemoryRouter>,
      div
    );
  });
});
