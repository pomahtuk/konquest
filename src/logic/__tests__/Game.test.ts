import ConquestGame, { getPlanetLimit } from "../Game";
import Player from "../Player";

const player1 = new Player("player1");
const player2 = new Player("player2");

describe("Main game", (): void => {
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

  it("Throws player count error", (): void => {
    const errorText = "Player count should be between 2 and 4";

    expect((): void => {
      new ConquestGame({
        fieldHeight: 4,
        fieldWidth: 4,
        neutralPlanetCount: 0,
        players: [player1, player2, player1, player1, player1]
      });
    }).toThrowError(errorText);

    expect((): void => {
      new ConquestGame({
        fieldHeight: 4,
        fieldWidth: 4,
        neutralPlanetCount: 0,
        players: [player1]
      });
    }).toThrowError(errorText);
  });

  it("Throws dimension error", (): void => {
    const errorText = "Game Field could not be less than 4 and bigger than 20 in any dimension";

    expect((): void => {
      new ConquestGame({
        fieldHeight: 3,
        fieldWidth: 3,
        neutralPlanetCount: 0,
        players: [player1, player2]
      });
    }).toThrowError(errorText);

    expect((): void => {
      new ConquestGame({
        fieldHeight: 21,
        fieldWidth: 4,
        neutralPlanetCount: 0,
        players: [player1, player2]
      });
    }).toThrowError(errorText);
  });

  it("Throws neutral planets error", (): void => {
    const planetLimit = getPlanetLimit(4 * 4, 2);
    expect((): void => {
      new ConquestGame({
        fieldHeight: 4,
        fieldWidth: 4,
        neutralPlanetCount: planetLimit + 1,
        players: [player1, player2]
      });
    }).toThrowError(`Game Field could not accommodate that many neutral planets, limit: ${planetLimit}`);
  });
});
