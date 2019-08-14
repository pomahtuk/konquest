import ConquestGame from "../../Game";
import Player from "../../Player";

const player1 = new Player("player1");
const player2 = new Player("player2");

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

  it("Trows error when passing invalid turn", (): void => {
    expect((): void => {
      game.addPlayerTurnData({
        playerId: player1.id,
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
        playerId: player2.id,
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

  // it("Does accept player 1 turn", (): void => {
  //   // we need to know it did not throw
  //   const res = game.addPlayerTurnData({
  //     playerId: player1.id,
  //     orders: [
  //       {
  //         origin: "A",
  //         destination: "C",
  //         amount: 10
  //       }
  //     ]
  //   });
  //   expect(res).toBe(undefined);
  // });

  // it("Does not accept player 1 turn for second time", (): void => {
  //   expect((): void => {
  //     game.addPlayerTurnData({
  //       playerId: player1.id,
  //       orders: [
  //         {
  //           origin: "A",
  //           destination: "C",
  //           amount: 10
  //         }
  //       ]
  //     });
  //   }).toThrowError("We are waiting for other player to make a move");
  // });

  // it("Does accept player 2 turn", (): void => {
  //   const res = game.addPlayerTurnData({
  //     playerId: player2.id,
  //     orders: [
  //       {
  //         origin: "B",
  //         destination: "A",
  //         amount: 10
  //       }
  //     ]
  //   });
  //   expect(res).toBe(undefined);
  // });

  // it("Able to process turn 1", (): void => {
  //   const maxShips = game.getPlanets()["C"].ships;
  //   const res = game.addPlayerTurnData({
  //     playerId: player1.id,
  //     orders: [
  //       {
  //         origin: "C",
  //         destination: "B",
  //         amount: maxShips
  //       }
  //     ]
  //   });
  //   expect(res).toBe(undefined);
  // });

  // it("Able to process turn 2", (): void => {
  //   // we need to know it did not throw
  //   const res = game.addPlayerTurnData({
  //     playerId: player2.id,
  //     orders: [
  //       {
  //         origin: "B",
  //         destination: "A",
  //         amount: 10
  //       }
  //     ]
  //   });
  //   expect(res).toBe(undefined);
  // });

  // it("some", (): void => {
  //   console.log(game);
  // });
});
