import React from "react";
import wrapWithReduxAndStyle, { CurrentStore } from "../testHelpers/wrapWithReduxAndStyle";
import { render, fireEvent } from "@testing-library/react";

import GameSettings from "../GameSettings";
const onStart = jest.fn();

describe("<GameSettings />", (): void => {
  it("renders <GameSettings /> component", (): void => {
    const { container } = render(wrapWithReduxAndStyle(<GameSettings />));
    expect(container).toBeDefined();
  });

  it("renders <GameSettings /> component and component able to start game", (): void => {
    const { container, getByText } = render(wrapWithReduxAndStyle(<GameSettings />));
    expect(container).toBeDefined();
    const button = getByText("Start Game");
    fireEvent.click(button);
    expect(CurrentStore.getState().game.isStarted).toBeTruthy();
  });

  it("<GameSettings /> component could update maxPlanets value depending on gamefieldSize", (): void => {
    const { getByTestId, getByText } = render(wrapWithReduxAndStyle(<GameSettings onStart={onStart} />));
    const neutralInput = getByTestId("neutralPlanets") as HTMLInputElement;
    const sizeInput = getByTestId("fieldSize");

    const changeEvent = { target: { value: "4" } };
    fireEvent.change(sizeInput, changeEvent);
    expect(neutralInput.value).toBe("2");

    const button = getByText("Start Game");
    fireEvent.click(button);

    expect(onStart).toHaveBeenCalledTimes(1);
  });
});
