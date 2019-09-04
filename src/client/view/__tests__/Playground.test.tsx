import React from "react";
import wrapWithReduxAndStyle, { CurrentStore } from "../testHelpers/wrapWithReduxAndStyle";
import { render } from "@testing-library/react";

import Playground from "../Playground";
import { setGameOptions, startGame } from "../../actions/game.actions";
import Player from "../../../logic/Player";

describe("<Playground />", (): void => {
  it("renders <Playground /> component", (): void => {
    const { container } = render(wrapWithReduxAndStyle(<Playground />));
    expect(container).toBeDefined();
  });

  it("renders <Playground /> component when game is started", (): void => {
    // first - start the game
    CurrentStore.dispatch(
      setGameOptions({
        fieldSize: 6,
        neutralPlanetCount: 1,
        players: [new Player("1"), new Player("2")]
      })
    );
    CurrentStore.dispatch(startGame());
    const { container } = render(wrapWithReduxAndStyle(<Playground />));
    expect(container).toBeDefined();
  });
});
