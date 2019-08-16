import React from "react";
import wrapWithReduxAndStyle from "../testHelpers/wrapWithReduxAndStyle";
import { render } from "@testing-library/react";

import Playground from "../Playground";

describe("<Playground />", (): void => {
  it("renders three <Playground /> component", (): void => {
    const { container } = render(wrapWithReduxAndStyle(<Playground />));
    expect(container).toBeDefined();
  });
});
