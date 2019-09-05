import ConquestGame from "../../Game";
import Player, { PlayerTurnOrder } from "../../Player";
import getPlanetName from "../../helpers/getPlanetName";

const player1 = new Player("player1");
const player2 = new Player("player2");

const generateMaxOrders = (startPlanetIndex: number): PlayerTurnOrder[] =>
  [...Array(10)].map((_, index) => ({
    origin: getPlanetName(startPlanetIndex),
    destination: getPlanetName(startPlanetIndex + index + 1),
    amount: 1
  }));

describe("Main game", (): void => {
  it("Exposing maximum and minimum parameters", (): void => {
    const { maxPlayers, minPlayers, maxSize, minSize } = ConquestGame;
    expect(maxPlayers).toBe(4);
    expect(minPlayers).toBe(2);
    expect(maxSize).toBe(20);
    expect(minSize).toBe(4);
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
    expect(players.length).toBe(2);

    // check we have planets generated
    expect(planets).toBeDefined();
    expect(Object.keys(planets).length).toBe(7);
    expect(planets["A"].coordinates).toBeDefined();
    expect(planets["B"].coordinates).toBeDefined();

    // now make sure we don't have turns from start
    expect(game.getTurns().length).toBe(0);
  });

  it("Can serialize and de-serialize game", (): void => {
    const player3 = new Player("player3");
    const player4 = new Player("player4");
    const originalGame = new ConquestGame({
      fieldHeight: 20,
      fieldWidth: 20,
      neutralPlanetCount: 22,
      players: [player1, player2, player3, player4]
    });
    // create some turns
    originalGame.addPlayerTurnData({
      player: player1,
      orders: generateMaxOrders(0)
    });
    originalGame.addPlayerTurnData({
      player: player2,
      orders: generateMaxOrders(1)
    });
    const midTurnRestoredGame = ConquestGame.deSerialize(originalGame.serialize()) as ConquestGame;
    expect(midTurnRestoredGame).toBeDefined();
    midTurnRestoredGame.addPlayerTurnData({
      player: player3,
      orders: generateMaxOrders(2)
    });
    midTurnRestoredGame.addPlayerTurnData({
      player: player4,
      orders: generateMaxOrders(3)
    });
    // get data from original
    const playersBefore = midTurnRestoredGame.getPlayers();
    const planetsBefore = midTurnRestoredGame.getPlanets();
    const fleetsBefore = midTurnRestoredGame.getFleets();
    const serializedString = midTurnRestoredGame.serialize();
    const bufferSize = Buffer.byteLength(serializedString, "utf8");
    console.log(bufferSize + "\n\n\n");
    // max size of a cookie per domain
    expect(bufferSize).toBeLessThanOrEqual(4095);
    // restore game
    const restoredGame = ConquestGame.deSerialize(serializedString) as ConquestGame;
    expect(restoredGame).toBeDefined();
    // and compare restored data
    const planetsAfter = restoredGame.getPlanets();
    const fleetsAfter = restoredGame.getFleets();
    const playersAfter = restoredGame.getPlayers();
    expect(planetsBefore).toMatchObject(planetsAfter);
    expect(playersBefore).toMatchObject(playersAfter);
    expect(fleetsBefore).toMatchObject(fleetsAfter);
  });

  it("Creates a new game with persister provided", (): void => {
    const persister = jest.fn();
    const game = new ConquestGame(
      {
        fieldHeight: 10,
        fieldWidth: 10,
        neutralPlanetCount: 5,
        players: [player1, player2]
      },
      persister
    );

    expect(game).toBeDefined();

    const serializedGame = game.serialize();
    expect(persister).toHaveBeenCalledWith(serializedGame);
    game.addPlayerTurnData({
      player: player1,
      orders: []
    });
    const newSerializedGame = game.serialize();
    expect(persister).toHaveBeenCalledWith(newSerializedGame);
  });

  it("Trows error when passing invalid params", (): void => {
    expect((): void => {
      new ConquestGame({
        fieldHeight: 10,
        fieldWidth: 10,
        neutralPlanetCount: 50,
        players: [player1, player2]
      });
    }).toThrow();
  });

  it("Able to mark player dead and ignore it for next one", (): void => {
    const player3 = new Player("player3");
    const game = new ConquestGame({
      fieldHeight: 4,
      fieldWidth: 4,
      neutralPlanetCount: 1,
      players: [player1, player2, player3]
    });
    const assaultPlayer2 = (): void => {
      game.addPlayerTurnData({
        player: player1,
        orders: [
          {
            amount: 10,
            origin: "A",
            destination: "B"
          }
        ]
      });
      game.addPlayerTurnData({
        player: player2,
        orders: []
      });
      game.addPlayerTurnData({
        player: player3,
        orders: [
          {
            amount: 10,
            origin: "C",
            destination: "B"
          }
        ]
      });
    };
    assaultPlayer2();
    // at this point turn should be complete
    // player2 dead and we are waiting for player1
    expect(game.waitingForPlayer).toBe(0);
    if (!player2.isDead) {
      assaultPlayer2();
    }
    expect(player2.isDead).toBe(true);
    game.addPlayerTurnData({
      player: player1,
      orders: []
    });
    // we should skip player2 because of dead status
    expect(game.waitingForPlayer).toBe(2);
  });
});
