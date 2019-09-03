import React from "react";
import { render } from "@testing-library/react";
import { matchers } from "jest-emotion";

expect.extend(matchers);

import wrapWithReduxAndStyle, { CurrentStore } from "../testHelpers/wrapWithReduxAndStyle";
import PlayerTurn from "../PlayerTurn";
import { startGame } from "../../actions/game.actions";

describe("<PlayerTurn />", (): void => {
  beforeAll((): void => {
    // start game
    CurrentStore.dispatch(startGame());
  });

  it("renders <PlayerTurn /> component without any selected planets", (): void => {
    const { container } = render(wrapWithReduxAndStyle(<PlayerTurn />));
    // expect(container).toMatchSnapshot();
  });
});
