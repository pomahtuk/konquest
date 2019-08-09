import ConquestGame, { getPlanetLimit } from "../../Game";
import Player from "../../Player";

const player1 = new Player("player1");
const player2 = new Player("player2");

describe("Game validations", (): void => {
  describe("Can validate new game parameters", (): void => {
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

  describe("Can validate player turn", (): void => {
    const game = new ConquestGame({
      fieldHeight: 4,
      fieldWidth: 4,
      neutralPlanetCount: 0,
      players: [player1, player2]
    });
    // make sure that
    // 0 - source is specified
    // 1 - source planet belong to player
    // 2 - destination is specified
    // 3 - source planet have required amount of ships available
    // 4 - stays true for all orders submitted
    it("Throws error for incomplete turn without player info", (): void => {
      expect((): void => {
        // @ts-ignore
        game.validateTurnData({ playerId: null, orders: [] });
      }).toThrowError("Player must be specified");
    });

    it("Throws error for incomplete turn without origin in order", (): void => {
      expect((): void => {
        // @ts-ignore
        game.validateTurnData({
          playerId: player1.id,
          orders: [
            {
              // @ts-ignore
              origin: null,
              destination: "B",
              amount: 0
            }
          ]
        });
      }).toThrowError("Origin planet is not specified");
    });

    it("Throws error for incomplete turn without destination in order", (): void => {
      expect((): void => {
        // @ts-ignore
        game.validateTurnData({
          playerId: player1.id,
          orders: [
            {
              origin: "A",
              // @ts-ignore
              destination: null,
              amount: 0
            }
          ]
        });
      }).toThrowError("Destination planet is not specified");
    });

    it("Throws error when trying to send more ships that are available at origin", (): void => {
      expect((): void => {
        game.validateTurnData({
          playerId: player1.id,
          orders: [
            {
              origin: "A",
              destination: "B",
              amount: 20
            }
          ]
        });
      }).toThrowError("Source planet have less ships than required");
    });

    it("Throws error when trying to send more ships that are available at origin in few orders", (): void => {
      expect((): void => {
        game.validateTurnData({
          playerId: player1.id,
          orders: [
            {
              origin: "A",
              destination: "B",
              amount: 9
            },
            {
              origin: "A",
              destination: "B",
              amount: 2
            }
          ]
        });
      }).toThrowError("Source planet have less ships than required");
    });
  });
});
