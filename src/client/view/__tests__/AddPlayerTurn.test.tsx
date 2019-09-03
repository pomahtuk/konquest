import React from "react";
import { render } from "@testing-library/react";
import { matchers } from "jest-emotion";

expect.extend(matchers);

import wrapWithReduxAndStyle from "../testHelpers/wrapWithReduxAndStyle";
import AddPlayerTurn from "../AddPlayerTurn";
import Player from "../../../logic/Player";
import Planet from "../../../logic/Planet";
import { Simulate } from "react-dom/test-utils";

const testPlayer = new Player("test");
const originPlanet = new Planet("A", testPlayer, { x: 0, y: 0 });
const destinationPlanet = new Planet("B", null, { x: 1, y: 1 });

const amountChange = jest.fn();
const addOrder = jest.fn();
const cancelOrder = jest.fn();

describe("<AddPlayerTurn />", (): void => {
  it("renders <AddPlayerTurn /> component without any selected planets", (): void => {
    const { container } = render(
      wrapWithReduxAndStyle(
        <AddPlayerTurn activePlayer={testPlayer} amount={10} onOrderAmountChange={amountChange} onAddOrder={addOrder} onCancel={cancelOrder} />
      )
    );
    expect(container).toMatchSnapshot();
  });

  it("renders <AddPlayerTurn /> component with origin planet selected", (): void => {
    const { container } = render(
      wrapWithReduxAndStyle(
        <AddPlayerTurn
          activePlayer={testPlayer}
          originPlanet={originPlanet}
          amount={10}
          onOrderAmountChange={amountChange}
          onAddOrder={addOrder}
          onCancel={cancelOrder}
        />
      )
    );
    expect(container).toMatchSnapshot();
  });

  it("renders <AddPlayerTurn /> component with origin and destination planet selected", (): void => {
    const { container } = render(
      wrapWithReduxAndStyle(
        <AddPlayerTurn
          activePlayer={testPlayer}
          originPlanet={originPlanet}
          destinationPlanet={destinationPlanet}
          amount={10}
          onOrderAmountChange={amountChange}
          onAddOrder={addOrder}
          onCancel={cancelOrder}
        />
      )
    );
    expect(container).toMatchSnapshot();
  });

  it("renders <AddPlayerTurn /> could change amount", (): void => {
    const { getByTestId, getByText } = render(
      wrapWithReduxAndStyle(
        <AddPlayerTurn
          activePlayer={testPlayer}
          originPlanet={originPlanet}
          destinationPlanet={destinationPlanet}
          amount={10}
          onOrderAmountChange={amountChange}
          onAddOrder={addOrder}
          onCancel={cancelOrder}
        />
      )
    );
    // first - check if we are passing event to amount change
    const input = getByTestId("order-amount") as HTMLInputElement;
    const changeEvent = { target: { value: "0" } };
    // seems like issue with types
    Simulate.change(input, changeEvent as any);
    expect(amountChange.mock.calls.length).toBe(1);
    expect(amountChange.mock.calls[0][0]).toMatchObject(changeEvent);
    // next check if we are calling cancel order
    Simulate.click(getByText("Cancel order"));
    expect(cancelOrder.mock.calls.length).toBe(1);
    // now make sure we are able to call create
    Simulate.click(getByText("Add order"));
    expect(addOrder.mock.calls.length).toBe(1);
  });
});
