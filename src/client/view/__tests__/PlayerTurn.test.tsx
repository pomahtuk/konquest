import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { matchers } from "jest-emotion";

expect.extend(matchers);

import wrapWithReduxAndStyle, { CurrentStore } from "../testHelpers/wrapWithReduxAndStyle";
import PlayerTurn from "../PlayerTurn";
import { startGame, setOriginPlanet, setDestinationPlanet } from "../../actions/game.actions";

const selectPlanets = (): void => {
  // get planets from store
  const { planets } = CurrentStore.getState();
  // dispatch select events
  CurrentStore.dispatch(setOriginPlanet(planets["A"]));
  CurrentStore.dispatch(setDestinationPlanet(planets["C"]));
};

describe("<PlayerTurn />", (): void => {
  beforeAll((): void => {
    // start game
    CurrentStore.dispatch(startGame());
  });

  it("renders <PlayerTurn /> component at the beginning of player turn", (): void => {
    const { container } = render(wrapWithReduxAndStyle(<PlayerTurn />));
    expect(container).toMatchSnapshot();
  });

  it("<PlayerTurn /> capable of basic turn modifications: add order, cancel order, complete turn", (): void => {
    const { activePlayer: startingPlayer } = CurrentStore.getState();
    const { getByText } = render(wrapWithReduxAndStyle(<PlayerTurn />));
    // now let's set selected planets
    selectPlanets();
    // at this point we should be able to add order
    const addOrderButton = getByText("Add order");
    fireEvent.click(addOrderButton);
    const { currentPlayerOrders } = CurrentStore.getState();
    expect(currentPlayerOrders).toHaveLength(1);
    // now we let's re-select planets
    selectPlanets();
    // and try de-selecting them
    const cancelOrderButton = getByText("Cancel order");
    fireEvent.click(cancelOrderButton);
    const { originPlanet, destinationPlanet } = CurrentStore.getState();
    expect(originPlanet).not.toBeDefined();
    expect(destinationPlanet).not.toBeDefined();
    // now let's complete turn
    const completeTurnButton = getByText("Complete turn");
    fireEvent.click(completeTurnButton);
    // at this point game should be waiting for new player
    const { activePlayer: currentPlayer } = CurrentStore.getState();
    expect(startingPlayer).not.toMatchObject(currentPlayer);
  });
});
