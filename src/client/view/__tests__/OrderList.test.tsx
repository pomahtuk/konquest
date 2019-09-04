import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { matchers } from "jest-emotion";

expect.extend(matchers);

import wrapWithReduxAndStyle from "../testHelpers/wrapWithReduxAndStyle";
import OrderList from "../OrderList";
import { PlayerTurnOrder } from "../../../logic/Player";

const removeOrder = jest.fn();

describe("<OrderList />", (): void => {
  it("renders <OrderList /> component without any orders", (): void => {
    const { container } = render(wrapWithReduxAndStyle(<OrderList orders={[]} removeOrder={removeOrder} />));
    expect(container).toMatchSnapshot();
  });

  it("renders <OrderList /> component with order", (): void => {
    const order: PlayerTurnOrder = { origin: "A", destination: "B", amount: 10 };
    const { container } = render(wrapWithReduxAndStyle(<OrderList orders={[order]} removeOrder={removeOrder} />));
    expect(container).toMatchSnapshot();
  });

  it("<OrderList /> calling remove callback", (): void => {
    const order: PlayerTurnOrder = { origin: "A", destination: "B", amount: 10 };
    const { getByTestId } = render(wrapWithReduxAndStyle(<OrderList orders={[order]} removeOrder={removeOrder} />));
    const removeButton = getByTestId("remove");
    fireEvent.click(removeButton);
    expect(removeOrder).toHaveBeenCalledTimes(1);
  });
});
