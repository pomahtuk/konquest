import ConquestGame, { GameStatus, TurnStatus } from "../../Game";
import Player from "../../Player";

const player1 = new Player("player1");
const player2 = new Player("player2");

const makeIdlePlayer1Turn = (game: ConquestGame): void => {
  game.addPlayerTurnData({
    player: player1,
    orders: []
  });
};

const makeIdlePlayer2Turn = (game: ConquestGame): void => {
  game.addPlayerTurnData({
    player: player2,
    orders: []
  });
};

describe("Could have a game", (): void => {
  let game: ConquestGame;
  beforeAll((): void => {
    game = new ConquestGame({
      fieldHeight: 4,
      fieldWidth: 4,
      neutralPlanetCount: 1,
      players: [player1, player2]
    });
  });

  // strategy here -
  // player2 just sitting on own planet accumulating ships
  // player 1 - waiting 3 turns and capturing neutral planet and sitting for a while accumulating ships
  // then when enough produced - combining fleets at neutral
  // and attacking player 2 capturing their planet

  it("Returns invalid status when passing invalid turn", (): void => {
    const result = game.addPlayerTurnData({
      player: player1,
      orders: [
        {
          origin: "Z",
          destination: "D",
          amount: 10
        }
      ]
    });
    expect(result).toBe(TurnStatus.INVALID);
  });

  it("Does not let player 2 take turn before player 1", (): void => {
    const result = game.addPlayerTurnData({
      player: player2,
      orders: [
        {
          origin: "B",
          destination: "D",
          amount: 10
        }
      ]
    });
    expect(result).toBe(TurnStatus.INVALID);
    expect(game.waitingForPlayer).toBe(0);
  });

  it("Does accept player 1 turn", (): void => {
    // we need to know it did not throw
    expect((): void => {
      makeIdlePlayer1Turn(game);
    }).not.toThrow();
  });

  it("Does not accept player 1 turn for second time", (): void => {
    expect(game.waitingForPlayer).toBe(1);
    const result = game.addPlayerTurnData({
      player: player1,
      orders: [
        {
          origin: "A",
          destination: "C",
          amount: 10
        }
      ]
    });
    expect(result).toBe(TurnStatus.INVALID);
  });

  it("Does accept player 2 turn", (): void => {
    expect((): void => {
      makeIdlePlayer2Turn(game);
    }).not.toThrow();
  });

  it("Capable of conducting simple battle", (): void => {
    // wait two more turns to be sure
    makeIdlePlayer1Turn(game);
    makeIdlePlayer2Turn(game);
    makeIdlePlayer1Turn(game);
    makeIdlePlayer2Turn(game);
    // let player 1 capture neutral planet
    const availableAttackFleet = game.getPlanets()["A"].ships;
    game.addPlayerTurnData({
      player: player1,
      orders: [
        {
          origin: "A",
          destination: "C",
          amount: availableAttackFleet
        }
      ]
    });
    makeIdlePlayer2Turn(game);
    // sitting here, waiting for 20 turns
    for (let i = 0; i < 20; i++) {
      makeIdlePlayer1Turn(game);
      makeIdlePlayer2Turn(game);
    }
    // done waiting, combine fleets
    // find best planet to use
    const combinePlanet = game.getPlanets()["A"].killPercent > game.getPlanets()["C"].killPercent ? "A" : "C";
    const sourcePlanet = combinePlanet === "A" ? "C" : "A";
    let availableFleetAtSource = game.getPlanets()[sourcePlanet].ships;
    game.addPlayerTurnData({
      player: player1,
      orders: [
        {
          origin: sourcePlanet,
          destination: combinePlanet,
          amount: availableFleetAtSource
        }
      ]
    });
    makeIdlePlayer2Turn(game);
    // at this point turn processed and we have combined fleet at planet C
    const availableFleetAtDestination = game.getPlanets()[combinePlanet].ships;
    availableFleetAtSource = game.getPlanets()[sourcePlanet].ships;
    game.addPlayerTurnData({
      player: player1,
      orders: [
        {
          origin: combinePlanet,
          destination: "B",
          amount: availableFleetAtDestination
        },
        {
          origin: sourcePlanet,
          destination: "B",
          amount: availableFleetAtSource
        }
      ]
    });
    makeIdlePlayer2Turn(game);
    // now game processed another turn
    // check if there are any fleets en route
    const fleets = game.getFleets();
    const fleetsTravelling = fleets.reduce((acc, fleetData) => {
      return [...acc, ...fleetData];
    }, []);
    if (fleetsTravelling.length > 0) {
      // wait a bit
      makeIdlePlayer1Turn(game);
      makeIdlePlayer2Turn(game);
    }
    // we should know the winner
    expect(game.status).toBe(GameStatus.COMPLETED);
    expect(game.winner).toBeDefined();
    // @ts-ignore
    expect(game.winner.id).toBe(player1.id);
  });

  // now game should not accept new turns
  it("Does not accept any player turns after game completion", (): void => {
    const result = game.addPlayerTurnData({
      player: player1,
      orders: []
    });
    expect(result).toBe(TurnStatus.IGNORED);
  });
});
