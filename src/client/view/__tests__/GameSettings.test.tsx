import React from "react";
import wrapWithReduxAndStyle, { CurrentStore } from "../testHelpers/wrapWithReduxAndStyle";
import { render, fireEvent } from "@testing-library/react";
import { addPlayer } from "../../actions/game.actions";
import Player from "../../../logic/Player";

import GameSettings from "../GameSettings";

describe("<GameSettings />", (): void => {
  it("renders three <GameSettings /> component", (): void => {
    const { container } = render(wrapWithReduxAndStyle(<GameSettings />));
    expect(container).toBeDefined();
  });

  it("renders three <GameSettings /> component and component able to start game", (): void => {
    const { container, getByText } = render(wrapWithReduxAndStyle(<GameSettings />));
    expect(container).toBeDefined();

    CurrentStore.dispatch(addPlayer(new Player("one")));
    CurrentStore.dispatch(addPlayer(new Player("two")));

    const button = getByText("Start Game");
    fireEvent.click(button);
    expect(CurrentStore.getState().isStarted).toBe(true);
  });
});
