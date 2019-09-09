import React from "react";
import { render, fireEvent } from "@testing-library/react";

import wrapWithReduxAndStyle, { CurrentStore } from "../testHelpers/wrapWithReduxAndStyle";
import PlayersList from "../PlayersList";
import { clearPlayers, addPlayer } from "../../actions/players.actions";
import Player from "../../../logic/Player";
import ComputerPlayerEasy from "../../../logic/ComputerPlayerEasy";

const playerName = "test player";
const computerName = "test computer";

const playerSelector = `👨‍🚀 ${playerName}`;
const computerSelector = `🤖 ${computerName}`;

const testPlayer = new Player(playerName);
const testComputer = new ComputerPlayerEasy(computerName);

describe("<PlayersList />", (): void => {
  it("renders <PlayersList /> component without any players", (): void => {
    // cleanup store
    CurrentStore.dispatch(clearPlayers());
    const { container } = render(wrapWithReduxAndStyle(<PlayersList />));
    expect(container).toMatchSnapshot();
  });

  it("renders <PlayersList /> component without both type of players", (): void => {
    // cleanup store
    CurrentStore.dispatch(clearPlayers());
    CurrentStore.dispatch(addPlayer(testPlayer));
    CurrentStore.dispatch(addPlayer(testComputer));

    const { container, getByText } = render(wrapWithReduxAndStyle(<PlayersList />));
    expect(container).toMatchSnapshot();
    expect(getByText(playerSelector)).toBeDefined();
    expect(getByText(computerSelector)).toBeDefined();
  });

  it("<PlayersList /> can remove player", (): void => {
    // cleanup store
    CurrentStore.dispatch(clearPlayers());
    CurrentStore.dispatch(addPlayer(testPlayer));
    const { getByTestId, queryByText } = render(wrapWithReduxAndStyle(<PlayersList />));

    expect(queryByText(playerSelector)).not.toBe(null);
    //
    const removeButton = getByTestId("remove");
    fireEvent.click(removeButton);
    // verify that no player is defined
    expect(queryByText(playerSelector)).toBe(null);
  });
});
