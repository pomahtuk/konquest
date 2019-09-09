import React from "react";
import { render, fireEvent } from "@testing-library/react";

import wrapWithReduxAndStyle, { CurrentStore } from "../testHelpers/wrapWithReduxAndStyle";
import GameField from "../GameField";
import { setGameOptions, startGame } from "../../actions/game.actions";
import Player from "../../../logic/Player";

describe("<GameField />", (): void => {
  it("renders <GameField /> component", (): void => {
    const wrapper = render(wrapWithReduxAndStyle(<GameField />));
    expect(wrapper).toMatchSnapshot();
  });

  it("Renders game within <GameField /> component", (): void => {
    // first - start the game
    CurrentStore.dispatch(
      setGameOptions({
        fieldSize: 6,
        neutralPlanetCount: 1,
        players: [new Player("1"), new Player("2")]
      })
    );
    CurrentStore.dispatch(startGame());

    const { container } = render(wrapWithReduxAndStyle(<GameField />));
    // we should have multiple planets and planet have SVG element
    expect(container.querySelectorAll("svg").length).toBeGreaterThan(1);
  });

  it("<GameField /> can restart game", (): void => {
    // get iteration
    const { iteration: startIteration } = CurrentStore.getState();
    // render
    const { getByText } = render(wrapWithReduxAndStyle(<GameField />));
    // find restart button
    const restartButton = getByText("Restart game");
    fireEvent.click(restartButton);
    // get current iteration
    const {
      game: { iteration: currentIteration }
    } = CurrentStore.getState();
    // should be different
    expect(startIteration).not.toBe(currentIteration);
  });
});
