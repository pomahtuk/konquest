import ConquestGame from "../Game";
import Player from "../Player";

const player1 = new Player("player1");
const player2 = new Player("player2");

describe("Main game", () => {
  it("Creates a new game with given params", () => {
    const game = new ConquestGame({
      fieldHeight: 10,
      fieldWidth: 10,
      neutralPlanetCount: 5,
      players: [player1, player2]
    });

    expect(game).toBeDefined();

    // get data
    const players = game.getPlayers();
    const planets = game.getPlanets();

    // check we have all players
    expect(players).toBeDefined();
    expect(Object.keys(players).length).toBe(2);

    // check we have planets generated
    expect(planets).toBeDefined();
    expect(Object.keys(planets).length).toBe(7);

    // check game field info is there
    expect(game.getDimensions()).toMatchObject({
      width: 10,
      height: 10
    });

    // now make sure we don't have turns from start
    expect(game.getTurns().length).toBe(0);
  });
});
