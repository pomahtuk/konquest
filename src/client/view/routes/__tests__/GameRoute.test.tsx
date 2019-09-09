import React from "react";

import wrapWithReduxAndStyle, { CurrentStore } from "../../testHelpers/wrapWithReduxAndStyle";
import GameRoute from "../GameRoute";
import { render } from "@testing-library/react";
import { startGame, setGameOptions } from "../../../actions/game.actions";
import Player from "../../../../logic/Player";
import { GameStatus } from "../../../../logic/Game";

const testPlayer = new Player("test");

describe("<GameRoute />", (): void => {
  it("Redirecting to Settings when game is not started", (): void => {
    const originError = console.error;
    console.error = jest.fn();
    render(wrapWithReduxAndStyle(<GameRoute />));
    expect(console.error).toHaveBeenCalled();
    console.error = originError;
  });

  it("Can render game once it started", (): void => {
    CurrentStore.dispatch(
      setGameOptions({
        fieldSize: 4,
        neutralPlanetCount: 1,
        players: [new Player("1"), new Player("2")]
      })
    );
    CurrentStore.dispatch(startGame());
    const { getByTestId } = render(wrapWithReduxAndStyle(<GameRoute />));
    expect(getByTestId("gamefield")).toBeDefined();
  });

  it("Redirecting to Stats once game is complete when game is not started", (): void => {
    const originError = console.error;
    console.error = jest.fn();
    CurrentStore.replaceReducer(() => ({
      game: {
        isStarted: true,
        winner: testPlayer,
        activePlayers: [testPlayer],
        status: GameStatus.COMPLETED,
        gameOptions: {}
      }
    }));
    render(wrapWithReduxAndStyle(<GameRoute />));
    expect(console.error).toHaveBeenCalled();
    console.error = originError;
  });
});
