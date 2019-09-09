import React from "react";
import { render } from "@testing-library/react";
import { matchers } from "jest-emotion";

expect.extend(matchers);

import StatsRoute from "../StatsRoute";
import wrapWithReduxAndStyle, { CurrentStore } from "../../testHelpers/wrapWithReduxAndStyle";
import Player from "../../../../logic/Player";
import { GameStatus } from "../../../../logic/Game";

const testPlayer = new Player("test");

describe("<StatsRoute />", (): void => {
  it("Redirecting to Settings when game is not complete", (): void => {
    const originError = console.error;
    console.error = jest.fn();
    const { container } = render(wrapWithReduxAndStyle(<StatsRoute />));
    expect(container).toMatchSnapshot();
    expect(console.error).toHaveBeenCalled();
    console.error = originError;
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
