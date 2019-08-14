import ConquestGame, { GameStatus } from "../../Game";
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
  // player 1 - waiting 2 turns and capturing neutral planet and sitting for a while accumulating ships
  // then when enough produced - combining fleets at neutral
  // and attacking player 2 capturing their planet

  it("Trows error when passing invalid turn", (): void => {
    expect((): void => {
      game.addPlayerTurnData({
        player: player1,
        orders: [
          {
            origin: "Z",
            destination: "D",
            amount: 10
          }
        ]
      });
    }).toThrow();
  });

  it("Does not let player 2 take turn before player 1", (): void => {
    expect((): void => {
      game.addPlayerTurnData({
        player: player2,
        orders: [
          {
            origin: "B",
            destination: "D",
            amount: 10
          }
        ]
      });
    }).toThrowError("We are waiting for other player to make a move");
  });

  it("Does accept player 1 turn", (): void => {
    // we need to know it did not throw
    expect((): void => {
      makeIdlePlayer1Turn(game);
    }).not.toThrow();
  });

  it("Does not accept player 1 turn for second time", (): void => {
    expect((): void => {
      game.addPlayerTurnData({
        player: player1,
        orders: [
          {
            origin: "A",
            destination: "C",
            amount: 10
          }
        ]
      });
    }).toThrowError("We are waiting for other player to make a move");
  });

  it("Does accept player 2 turn", (): void => {
    expect((): void => {
      makeIdlePlayer2Turn(game);
    }).not.toThrow();
  });

  it("Takes player turns in orders", (): void => {
    // wait one more turn to be sure
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
    // sitting here, waiting for 10 turns
    for (let i = 0; i < 10; i++) {
      makeIdlePlayer1Turn(game);
      makeIdlePlayer2Turn(game);
    }
    // done waiting, combine fleets
    const availableFleetAtA = game.getPlanets()["A"].ships;
    game.addPlayerTurnData({
      player: player1,
      orders: [
        {
          origin: "A",
          destination: "C",
          amount: availableFleetAtA
        }
      ]
    });
    makeIdlePlayer2Turn(game);
    // at this point turn processed and we have combined fleet at planet C
    const availableFleetAtC = game.getPlanets()["C"].ships;
    game.addPlayerTurnData({
      player: player1,
      orders: [
        {
          origin: "C",
          destination: "B",
          amount: availableFleetAtC
        }
      ]
    });
    makeIdlePlayer2Turn(game);
    // now game processed another turn
    // we should know the winner
    expect(game.status).toBe(GameStatus.COMPLETED);
    expect(game.winner).toBeDefined();
    // @ts-ignore
    expect(game.winner.id).toBe(player1.id);
  });

  // now game should not accept new turns
});
