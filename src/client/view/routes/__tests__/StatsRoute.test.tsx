import React from "react";
import { render } from "@testing-library/react";

import StatsRoute from "../StatsRoute";
import wrapWithReduxAndStyle, { CurrentStore } from "../../testHelpers/wrapWithReduxAndStyle";
import Player from "../../../../logic/Player";
import { GameStatus } from "../../../../logic/Game";

import { Redirect as MockRedirect } from "@reach/router";
jest.mock("@reach/router", () => {
  const RouterMocks = jest.requireActual("@reach/router");
  return {
    ...RouterMocks,
    Redirect: jest.fn().mockImplementation(() => {
      return <span>Redirect</span>;
    })
  };
});

const testPlayer = new Player("test");

describe("<StatsRoute />", (): void => {
  it("Redirecting to Settings when game is not complete", (): void => {
    const { container } = render(wrapWithReduxAndStyle(<StatsRoute />));
    expect(container).toMatchSnapshot();
    expect(MockRedirect).toHaveBeenCalledTimes(1);
  });

  // Order matters - this should be the last one
  it("Renders without exploding", (): void => {
    CurrentStore.replaceReducer(() => ({
      game: {
        winner: testPlayer,
        activePlayers: [testPlayer],
        status: GameStatus.COMPLETED
      }
    }));
    CurrentStore.dispatch({ type: "some" });
    const { container } = render(wrapWithReduxAndStyle(<StatsRoute />));
    expect(container).toMatchSnapshot();
  });
});
