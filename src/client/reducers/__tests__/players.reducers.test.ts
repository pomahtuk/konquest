import players from "../players.reducers";
import Player from "../../../logic/Player";
import { clearPlayers, addPlayer, removePlayer, setPlayers } from "../../actions/players.actions";

const testPlayer = new Player("test");
const testPlayer2 = new Player("test2");
const testPlayer3 = new Player("test3");

describe("players reducer", (): void => {
  it("Could delete all players", (): void => {
    const result = players([testPlayer], clearPlayers());
    expect(result).toHaveLength(0);
  });

  it("Could add all players", (): void => {
    const result = players([testPlayer], setPlayers([testPlayer2, testPlayer3]));
    expect(result).toHaveLength(2);
    expect(result[0].id).not.toBe(testPlayer.id);
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
