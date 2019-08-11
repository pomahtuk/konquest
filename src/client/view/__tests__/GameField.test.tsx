import React from "react";
import { mount } from "enzyme";

import GameField from "../GameField";

import ConquestGame from "../../../logic/Game";
import Player from "../../../logic/Player";

const player1 = new Player("player1");
const player2 = new Player("player2");

const game = new ConquestGame({
  fieldHeight: 10,
  fieldWidth: 10,
  neutralPlanetCount: 5,
  players: [player1, player2]
});

describe("<GameField />", (): void => {
  it("renders <GameField /> component", (): void => {
    const wrapper = mount(<GameField game={game} />);
    expect(wrapper).toBeDefined();
  });
});
