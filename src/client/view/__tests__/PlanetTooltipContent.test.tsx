import React from "react";
import { render } from "@testing-library/react";

import wrapWithReduxAndStyle from "../testHelpers/wrapWithReduxAndStyle";
import PlanetTooltipContent from "../PlanetTooltipContent";
import Planet from "../../../logic/Planet";
import Player from "../../../logic/Player";

describe("<PlanetTooltipContent />", (): void => {
  it("renders <PlanetTooltipContent /> component for neutral planet", (): void => {
    const testPlanet = new Planet("A");
    testPlanet.ships = 10;
    testPlanet.killPercent = 0.5;
    testPlanet.production = 10;

    const { container } = render(wrapWithReduxAndStyle(<PlanetTooltipContent planet={testPlanet} />));
    expect(container).toMatchSnapshot();
  });

  it("renders <PlanetTooltipContent /> component for player planet", (): void => {
    const testPlayer = new Player("test");
    const testPlanet = new Planet("A", testPlayer);
    testPlanet.ships = 10;
    testPlanet.killPercent = 0.5;
    testPlanet.production = 10;

    const { container } = render(wrapWithReduxAndStyle(<PlanetTooltipContent planet={testPlanet} />));
    expect(container).toMatchSnapshot();
  });

  it("renders <PlanetTooltipContent /> component for player planet and ships modifier", (): void => {
    const testPlayer = new Player("test");
    const testPlanet = new Planet("A", testPlayer);
    testPlanet.ships = 10;
    testPlanet.killPercent = 0.5;
    testPlanet.production = 10;

    const { container } = render(wrapWithReduxAndStyle(<PlanetTooltipContent planet={testPlanet} modifier={10} />));
    expect(container).toMatchSnapshot();
  });
});
