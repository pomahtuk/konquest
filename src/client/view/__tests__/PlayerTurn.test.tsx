import React from "react";
import { render, fireEvent } from "@testing-library/react";

import wrapWithReduxAndStyle, { CurrentStore } from "../testHelpers/wrapWithReduxAndStyle";
import PlayerTurn from "../PlayerTurn";
import { startGame, setGameOptions } from "../../actions/game.actions";
import { setOriginPlanet, setDestinationPlanet } from "../../actions/turn.actions";
import Player from "../../../logic/Player";

const selectPlanets = (): void => {
  // get planets from store
  const {
    game: { planets }
  } = CurrentStore.getState();
  // dispatch select events
  CurrentStore.dispatch(setOriginPlanet(planets["A"]));
  CurrentStore.dispatch(setDestinationPlanet(planets["C"]));
};

describe("<PlayerTurn />", (): void => {
  beforeAll((): void => {
    // prepare game
    CurrentStore.dispatch(
      setGameOptions({
        fieldSize: 6,
        neutralPlanetCount: 1,
        players: [new Player("1"), new Player("2")]
      })
    );
    // start game
    CurrentStore.dispatch(startGame());
  });

  it("renders <PlayerTurn /> component at the beginning of player turn", (): void => {
    const { container } = render(wrapWithReduxAndStyle(<PlayerTurn />));
    expect(container).toMatchSnapshot();
  });

  it("<PlayerTurn /> capable of basic turn modifications: add order, cancel order, complete turn", (): void => {
    const {
      game: { activePlayer: startingPlayer }
    } = CurrentStore.getState();
    const { getByText } = render(wrapWithReduxAndStyle(<PlayerTurn />));
    // now let's set selected planets
    selectPlanets();
    // at this point we should be able to add order
    const addOrderButton = getByText("Add order");
    fireEvent.click(addOrderButton);
    const {
      turn: { currentPlayerOrders }
    } = CurrentStore.getState();
    expect(currentPlayerOrders).toHaveLength(1);
    // now we let's re-select planets
    selectPlanets();
    // and try de-selecting them
    const cancelOrderButton = getByText("Cancel order");
    fireEvent.click(cancelOrderButton);
    const {
      turn: { originPlanet, destinationPlanet }
    } = CurrentStore.getState();
    expect(originPlanet).not.toBeDefined();
    expect(destinationPlanet).not.toBeDefined();
    // now let's complete turn
    const completeTurnButton = getByText("Complete turn");
    fireEvent.click(completeTurnButton);
    // at this point game should be waiting for new player
    const {
      game: { activePlayer: currentPlayer }
    } = CurrentStore.getState();
    expect(startingPlayer).not.toMatchObject(currentPlayer);
  });

  it("<PlayerTurn /> capable of removing already added turn order", (): void => {
    const { getByText, getByTestId } = render(wrapWithReduxAndStyle(<PlayerTurn />));
    // now let's set selected planets
    selectPlanets();
    // at this point we should be able to add order
    const addOrderButton = getByText("Add order");
    fireEvent.click(addOrderButton);

    // order added, should be able to remove
    const removeButton = getByTestId("remove");
    expect(removeButton).toBeDefined();
    fireEvent.click(removeButton);

    const {
      turn: { currentPlayerOrders }
    } = CurrentStore.getState();
    expect(currentPlayerOrders).toHaveLength(0);
  });
});
