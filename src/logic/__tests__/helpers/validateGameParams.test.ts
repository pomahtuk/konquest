import ConquestGame from "../../Game";
import validateGameParams from "../../helpers/validateGameParams";
import getPlanetLimit from "../../helpers/getPlanetLimit";

import Player from "../../Player";

const player1 = new Player("player1");
const player2 = new Player("player2");

describe("Can validate new game parameters", (): void => {
  it("Passing validation for correct parameters", (): void => {
    const planetLimit = getPlanetLimit(ConquestGame.minSize ** 2, 2);
    const validationResult = validateGameParams({
      fieldHeight: ConquestGame.minSize,
      fieldWidth: ConquestGame.minSize,
      neutralPlanetCount: planetLimit,
      players: [player1, player2]
    });

    expect(validationResult).toMatchObject({
      valid: true
    });
  });

  it("Returns player count error", (): void => {
    const validationResult = validateGameParams({
      fieldHeight: 4,
      fieldWidth: 4,
      neutralPlanetCount: 0,
      players: []
    });

    expect(validationResult).toMatchObject({
      valid: false,
      error: "Player count should be between 2 and 4"
    });
  });

  it("Returns player count error when no players passed", (): void => {
    // @ts-ignore
    const validationResult = validateGameParams({
      fieldHeight: 4,
      fieldWidth: 4,
      neutralPlanetCount: 0
    });

    expect(validationResult).toMatchObject({
      valid: false,
      error: "Player count should be between 2 and 4"
    });
  });

  it("Returns dimension error", (): void => {
    const error = {
      valid: false,
      error: "Game Field could not be less than 4 and bigger than 20 in any dimension"
    };

    const validationResult = validateGameParams({
      fieldHeight: 3,
      fieldWidth: 3,
      neutralPlanetCount: 0,
      players: [player1, player2]
    });

    expect(validationResult).toMatchObject(error);

    const secondValidationResult = validateGameParams({
      fieldHeight: 21,
      fieldWidth: 21,
      neutralPlanetCount: 0,
      players: [player1, player2]
    });

    expect(secondValidationResult).toMatchObject(error);
  });

  it("Returns neutral planets error", (): void => {
    const planetLimit = getPlanetLimit(4 * 4, 2);
    const validationResult = validateGameParams({
      fieldHeight: 4,
      fieldWidth: 4,
      neutralPlanetCount: planetLimit + 1,
      players: [player1, player2]
    });

    expect(validationResult).toMatchObject({
      valid: false,
      error: `Game Field could not accommodate that many neutral planets, limit: ${planetLimit}`
    });
  });
});
