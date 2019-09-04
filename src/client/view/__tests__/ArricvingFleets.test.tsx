import React from "react";
import { render } from "@testing-library/react";

import wrapWithReduxAndStyle from "../testHelpers/wrapWithReduxAndStyle";
import ArrivingFleets from "../ArrivingFleets";
import { ArrivingFleet } from "../../reducers/game.reducers";

describe("<ArrivingFleets />", (): void => {
  it("renders <ArrivingFleets /> component without any orders", (): void => {
    const { container } = render(wrapWithReduxAndStyle(<ArrivingFleets fleets={[]} />));
    expect(container).toMatchSnapshot();
  });

  it("renders <OrderList /> component with fleet", (): void => {
    const fleet: ArrivingFleet = { arrivingIn: 0, destination: "B", amount: 10, killPercent: 0.5 };
    const { container } = render(wrapWithReduxAndStyle(<ArrivingFleets fleets={[fleet]} />));
    expect(container).toMatchSnapshot();
  });
});
