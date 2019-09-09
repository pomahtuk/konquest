import React from "react";
import { render, fireEvent } from "@testing-library/react";

import wrapWithReduxAndStyle, { CurrentStore } from "../testHelpers/wrapWithReduxAndStyle";
import Planet from "../Planet";
import { setGameOptions, startGame } from "../../actions/game.actions";
import Player from "../../../logic/Player";

const testCoordinates = { x: 0, y: 0 };

describe("<Planet />", (): void => {
  beforeAll((): void => {
    CurrentStore.dispatch(
      setGameOptions({
        fieldSize: 4,
        neutralPlanetCount: 1,
        players: [new Player("1"), new Player("2")]
      })
    );
    CurrentStore.dispatch(startGame());
  });

  it("Renders planet not belonging to player without exploding when nothing selected and not allowing click", (): void => {
    const {
      game: { planets }
    } = CurrentStore.getState();
    // make sure tests would not fail due to random factors
    planets.B.mainColor = "#000";
    planets.B.coordinates = testCoordinates;
    const { container, getByTestId } = render(wrapWithReduxAndStyle(<Planet blockSize={40} planet={planets["B"]} />));
    expect(container).toMatchSnapshot();
    const planetElement = getByTestId("planet");
    fireEvent.click(planetElement);
    expect(CurrentStore.getState().turn.destinationPlanet).not.toBeDefined();
    expect(CurrentStore.getState().turn.originPlanet).not.toBeDefined();
  });

  it("Renders player planet without exploding when nothing selected", (): void => {
    const {
      game: { planets }
    } = CurrentStore.getState();
    // make sure tests would not fail due to random factors
    planets.A.mainColor = "#000";
    planets.A.coordinates = testCoordinates;
    const { container, getByTestId } = render(wrapWithReduxAndStyle(<Planet blockSize={40} planet={planets["A"]} />));
    expect(container).toMatchSnapshot();
    const planetElement = getByTestId("planet");
    fireEvent.click(planetElement);
    expect(CurrentStore.getState().turn.originPlanet.name).toBe("A");
  });

  it("Renders player planet without exploding when it is origin planet", (): void => {
    const {
      game: { planets }
    } = CurrentStore.getState();
    // make sure tests would not fail due to random factors
    planets.A.mainColor = "#000";
    planets.A.coordinates = testCoordinates;
    const { container } = render(wrapWithReduxAndStyle(<Planet blockSize={40} planet={planets["A"]} />));
    expect(container).toMatchSnapshot();
  });

  it("Renders neutral planet without exploding when origin selected and allowing to set this planet as destination", (): void => {
    const {
      game: { planets }
    } = CurrentStore.getState();
    // make sure tests would not fail due to random factors
    planets.C.mainColor = "#000";
    planets.C.coordinates = testCoordinates;
    const { container, getByTestId } = render(wrapWithReduxAndStyle(<Planet blockSize={40} planet={planets["C"]} />));
    expect(container).toMatchSnapshot();
    const planetElement = getByTestId("planet");
    fireEvent.click(planetElement);
    expect(CurrentStore.getState().turn.destinationPlanet.name).toBe("C");
  });

  it("Renders player planet without exploding when it is origin planet and deselecting all on click", (): void => {
    const {
      game: { planets }
    } = CurrentStore.getState();
    // make sure tests would not fail due to random factors
    planets.A.mainColor = "#000";
    planets.A.coordinates = testCoordinates;
    const { getByTestId } = render(wrapWithReduxAndStyle(<Planet blockSize={40} planet={planets["A"]} />));
    const planetElement = getByTestId("planet");
    fireEvent.click(planetElement);
    expect(CurrentStore.getState().turn.destinationPlanet).not.toBeDefined();
    expect(CurrentStore.getState().turn.originPlanet.name).toBe("A");
  });
});
