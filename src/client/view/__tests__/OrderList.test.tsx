import React from "react";
import { render } from "@testing-library/react";
import { matchers } from "jest-emotion";

expect.extend(matchers);

import wrapWithReduxAndStyle from "../testHelpers/wrapWithReduxAndStyle";
import OrderList from "../OrderList";
import { PlayerTurnOrder } from "../../../logic/Player";

describe("<OrderList />", (): void => {
  it("renders <OrderList /> component without any orders", (): void => {
    const { container } = render(wrapWithReduxAndStyle(<OrderList orders={[]} />));
    expect(container).toMatchSnapshot();
  });

  it("renders <OrderList /> component with order", (): void => {
    const order: PlayerTurnOrder = { origin: "A", destination: "B", amount: 10 };
    const { container } = render(wrapWithReduxAndStyle(<OrderList orders={[order]} />));
    expect(container).toMatchSnapshot();
  });
});
