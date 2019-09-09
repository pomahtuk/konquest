import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { matchers } from "jest-emotion";

expect.extend(matchers);

import wrapWithReduxAndStyle, { CurrentStore } from "../../testHelpers/wrapWithReduxAndStyle";
import SettingsRoute from "../SettingsRoute";

describe("<SettingsRoute />", (): void => {
  it("Redirecting to Settings when game is not started", (): void => {
    const { container } = render(wrapWithReduxAndStyle(<SettingsRoute />));
    expect(container).toMatchSnapshot();
  });

  // Order matters - this should be the last one
  it("Can start game", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<SettingsRoute />));
    const startGame = getByText("Start Game");
    fireEvent.click(startGame);
    expect(CurrentStore.getState().game.isStarted).toBeTruthy();
  });
});
