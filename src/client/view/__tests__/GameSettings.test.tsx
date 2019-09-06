import React from "react";
import wrapWithReduxAndStyle from "../testHelpers/wrapWithReduxAndStyle";
import { render, fireEvent } from "@testing-library/react";

import GameSettings from "../GameSettings";
const onStart = jest.fn();

describe("<GameSettings />", (): void => {
  it("renders <GameSettings /> component", (): void => {
    const { container } = render(wrapWithReduxAndStyle(<GameSettings onStart={onStart} />));
    expect(container).toBeDefined();
  });

  it("renders <GameSettings /> component and component able to start game", (): void => {
    const { container, getByText } = render(wrapWithReduxAndStyle(<GameSettings onStart={onStart} />));
    expect(container).toBeDefined();
    const button = getByText("Start Game");
    fireEvent.click(button);
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it("<GameSettings /> component could update maxPlanets value depending on gamefieldSize", (): void => {
    const { getByTestId } = render(wrapWithReduxAndStyle(<GameSettings onStart={onStart} />));
    const neutralInput = getByTestId("neutralPlanets") as HTMLInputElement;
    const sizeInput = getByTestId("fieldSize");

    const changeEvent = { target: { value: "4" } };
    fireEvent.change(sizeInput, changeEvent);
    expect(neutralInput.value).toBe("2");

    expect(onStart).toHaveBeenCalledTimes(1);
  });
});
