import React from "react";
import wrapWithReduxAndStyle, { CurrentStore } from "../testHelpers/wrapWithReduxAndStyle";
import { render, fireEvent } from "@testing-library/react";

import GameSettings from "../GameSettings";

describe("<GameSettings />", (): void => {
  it("renders three <GameSettings /> component", (): void => {
    const { container } = render(wrapWithReduxAndStyle(<GameSettings />));
    expect(container).toBeDefined();
  });

  it("renders three <GameSettings /> component and component able to start game", (): void => {
    const { container, getByText } = render(wrapWithReduxAndStyle(<GameSettings />));
    expect(container).toBeDefined();
    const button = getByText("Start Game");
    fireEvent.click(button);
    expect(CurrentStore.getState().isStarted).toBe(true);
  });
});
