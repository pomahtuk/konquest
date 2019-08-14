import validateTurnData from "../../helpers/validateTurnData";

import Planet, { PlanetMap } from "../../Planet";
import Player from "../../Player";

const player1 = new Player("player1");

const planets: PlanetMap = {
  A: new Planet("A", player1),
  B: new Planet("B")
};

describe("Can validate player turn", (): void => {
  it("Validates correct turn", (): void => {
    const validationResult = validateTurnData(
      {
        playerId: player1.id,
        orders: [
          {
            origin: "A",
            destination: "B",
            amount: 10
          }
        ]
      },
      planets
    );
    expect(validationResult).toMatchObject({
      valid: true
    });

    const emptyTurnValidationResult = validateTurnData(
      {
        playerId: player1.id,
        orders: []
      },
      planets
    );
    expect(emptyTurnValidationResult).toMatchObject({
      valid: true
    });
  });

  it("Return error for incomplete turn without player info", (): void => {
    // @ts-ignore
    const validationResult = validateTurnData({ playerId: null, orders: [] }, planets);
    expect(validationResult).toMatchObject({
      valid: false,
      error: "Player must be specified"
    });
  });

  it("Return error for incomplete turn without origin in order", (): void => {
    const validationResult = validateTurnData(
      // @ts-ignore
      {
        playerId: 1,
        orders: [
          {
            // @ts-ignore
            origin: null,
            destination: "B",
            amount: 0
          }
        ]
      },
      planets
    );
    expect(validationResult).toMatchObject({
      valid: false,
      error: "Origin planet is not specified or not available in game"
    });

    const missingValidationResult = validateTurnData(
      {
        playerId: 1,
        orders: [
          {
            origin: "Z",
            destination: "B",
            amount: 0
          }
        ]
      },
      planets
    );
    expect(missingValidationResult).toMatchObject({
      valid: false,
      error: "Origin planet is not specified or not available in game"
    });
  });

  it("Return error for incomplete turn without destination in order", (): void => {
    const validationResult = validateTurnData(
      // @ts-ignore
      {
        playerId: 1,
        orders: [
          // @ts-ignore
          {
            origin: "A",
            // @ts-ignore
            destination: null,
            amount: 0
          }
        ]
      },
      planets
    );
    expect(validationResult).toMatchObject({
      valid: false,
      error: "Destination planet is not specified or not available in game"
    });

    const missingValidationResult = validateTurnData(
      {
        playerId: 1,
        orders: [
          {
            origin: "A",
            destination: "Z",
            amount: 0
          }
        ]
      },
      planets
    );
    expect(missingValidationResult).toMatchObject({
      valid: false,
      error: "Destination planet is not specified or not available in game"
    });
  });

  it("Return error when trying to send ships from planet which does not belong to player", (): void => {
    const validationResult = validateTurnData(
      {
        playerId: player1.id,
        orders: [
          {
            origin: "B",
            destination: "A",
            amount: 10
          }
        ]
      },
      planets
    );
    expect(validationResult).toMatchObject({
      valid: false,
      error: "Origin planet does not belong to player!"
    });
  });

  it("Throws error when trying to send more ships that are available at origin", (): void => {
    const validationResult = validateTurnData(
      {
        playerId: player1.id,
        orders: [
          {
            origin: "A",
            destination: "B",
            amount: 20
          }
        ]
      },
      planets
    );
    expect(validationResult).toMatchObject({
      valid: false,
      error: "Origin planet have less ships than required"
    });
  });

  it("Throws error when trying to send more ships that are available at origin in few orders", (): void => {
    const validationResult = validateTurnData(
      {
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
      },
      planets
    );
    expect(validationResult).toMatchObject({ error: "Origin planet have less ships than required", valid: false });
  });
});
