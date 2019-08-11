import ConquestGame, { getPlanetLimit, getDistanceBetweenPoints } from "../../Game";
import Player from "../../Player";

const player1 = new Player("player1");
const player2 = new Player("player2");

describe("Main game", (): void => {
  it("Exposing maximum and minimum parameters", (): void => {
    const { maxPlayers, minPlayers, maxSize, minSize } = ConquestGame;
    expect(maxPlayers).toBe(4);
    expect(minPlayers).toBe(2);
    expect(maxSize).toBe(20);
    expect(minSize).toBe(4);
  });

  it("Can calculate planetLimit", (): void => {
    const smallLimit = getPlanetLimit(4 ** 2, 2);
    expect(smallLimit).toEqual(2);

    const bigLimit = getPlanetLimit(10 ** 2, 4);
    expect(bigLimit).toEqual(16);

    const tooBigLimit = getPlanetLimit(20 ** 2, 4);
    expect(tooBigLimit).toEqual(26 - 4);
  });

  it("Creates a new game with given params", (): void => {
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
    expect(planets["A"].coordinates).toMatchObject({ x: 0, y: 0 });
    expect(planets["B"].coordinates).toMatchObject({ x: 9, y: 9 });

    // check game field info is there
    expect(game.getDimensions()).toMatchObject({
      width: 10,
      height: 10
    });

    // now make sure we don't have turns from start
    expect(game.getTurns().length).toBe(0);
  });

  it("Can calculate distance between points", (): void => {
    const A = {
      x: 0,
      y: 0
    };
    const B = {
      x: 3,
      y: 3
    };
    expect(getDistanceBetweenPoints(A, B)).toBe(1);
    expect(getDistanceBetweenPoints(B, A)).toBe(1);
    A.x = 2;
    A.y = 1;
    expect(getDistanceBetweenPoints(A, B)).toBe(0);
    expect(getDistanceBetweenPoints(B, A)).toBe(0);
  });
});
