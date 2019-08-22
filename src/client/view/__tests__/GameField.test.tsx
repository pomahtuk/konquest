import React from "react";
import { render } from "@testing-library/react";

import wrapWithReduxAndStyle, { CurrentStore } from "../testHelpers/wrapWithReduxAndStyle";
import GameField from "../GameField";
import { addPlayer, setGameOptions, startGame } from "../../actions/game.actions";
import Player from "../../../logic/Player";

describe("<GameField />", (): void => {
  it("renders <GameField /> component", (): void => {
    const wrapper = render(wrapWithReduxAndStyle(<GameField />));
    expect(wrapper).toBeDefined();
  });

  it("Renders game withing <GameField /> component", (): void => {
    // first - start the game
    CurrentStore.dispatch(addPlayer(new Player("1")));
    CurrentStore.dispatch(addPlayer(new Player("2")));
    CurrentStore.dispatch(
      setGameOptions({
        fieldSize: 4,
        neutralPlanetCount: 1
      })
    );
    CurrentStore.dispatch(startGame());

    const { container } = render(wrapWithReduxAndStyle(<GameField />));
    expect(container).toBeDefined();
    // expect(getByTestId("gamefield")).toBeDefined();
  });
});
