import React from "react";
import { render, fireEvent } from "@testing-library/react";
import wrapWithReduxAndStyle, { CurrentStore } from "../testHelpers/wrapWithReduxAndStyle";
import AddPlayer from "../AddPlayer";
import Player from "../../../logic/Player";
import ComputerPlayer, { ComputerPlayerType } from "../../../logic/ComputerPlayer";

describe("<AddPlayer />", (): void => {
  it("Does not allow adding player what no name entered", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<AddPlayer />));
    const addButton = getByText("Add player");
    fireEvent.click(addButton);
    const settingsPlayers: Player[] = CurrentStore.getState().players;
    // we already have 2 players in store
    expect(settingsPlayers).toHaveLength(2);
  });
  it("Can change player name", (): void => {
    const { getByText, getByTestId } = render(wrapWithReduxAndStyle(<AddPlayer />));
    const playerNameInput = getByTestId("playerName") as HTMLInputElement;
    fireEvent.change(playerNameInput, { target: { value: "test" } });
    const addButton = getByText("Add player");
    fireEvent.click(addButton);
    const settingsPlayers: Player[] = CurrentStore.getState().players;
    // we already have 2 players in store
    expect(settingsPlayers).toHaveLength(3);
    expect(settingsPlayers[2].screenName).toBe("test");
  });
  it("Can change player type", (): void => {
    const { getByText, getByTestId } = render(wrapWithReduxAndStyle(<AddPlayer />));
    const playerNameInput = getByTestId("playerName") as HTMLInputElement;
    const playerTypeInput = getByTestId("playerType") as HTMLSelectElement;
    fireEvent.change(playerNameInput, { target: { value: "test computer" } });
    fireEvent.change(playerTypeInput, { target: { value: ComputerPlayerType.EASY } });
    const addButton = getByText("Add player");
    fireEvent.click(addButton);
    const settingsPlayers: ComputerPlayer[] = CurrentStore.getState().players;
    // we already have 2 players in store
    expect(settingsPlayers).toHaveLength(4);
    expect(settingsPlayers[3].screenName).toBe("test computer");
    expect(settingsPlayers[3].isComputer).toBe(true);
    expect(settingsPlayers[3].computerType).toBe(ComputerPlayerType.EASY);
  });
});
