import players from "../players.reducers";
import Player from "../../../logic/Player";
import { clearPlayers, addPlayer, removePlayer } from "../../actions/players.actions";

const testPlayer = new Player("test");

describe("players reducer", (): void => {
  it("Could delete all players", (): void => {
    const result = players([testPlayer], clearPlayers());
    expect(result).toHaveLength(0);
  });

  it("Could add player", (): void => {
    const result = players([], addPlayer(testPlayer));
    expect(result).toHaveLength(1);
  });

  it("Could remove player", (): void => {
    const result = players([testPlayer], removePlayer(testPlayer));
    expect(result).toHaveLength(0);
  });
});
