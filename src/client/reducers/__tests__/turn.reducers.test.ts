import turn, { TurnStoreData } from "../turn.reducers";
import {
  setOriginPlanet,
  setDestinationPlanet,
  unsetPlanets,
  clearTurnData,
  addPlayerTurnOrder,
  removePlayerTurnOrder
} from "../../actions/turn.actions";
import Planet from "../../../logic/Planet";
import { PlayerTurnOrder } from "../../../logic/Player";

const defaultState: TurnStoreData = {
  originPlanet: undefined,
  destinationPlanet: undefined,
  turnError: false,
  currentPlayerOrders: [],
  currentShipsModifier: {}
};

const planet = new Planet("A");
const order: PlayerTurnOrder = { origin: "A", destination: "B", amount: 10 };

describe("turn reducer", (): void => {
  it("Could set origin planet", (): void => {
    const result = turn(defaultState, setOriginPlanet(planet));
    expect(result.originPlanet).toMatchObject(planet);
  });

  it("Could set destination planet", (): void => {
    const result = turn(defaultState, setDestinationPlanet(planet));
    expect(result.destinationPlanet).toMatchObject(planet);
  });

  it("Could unset destination and origin planets", (): void => {
    const result = turn({ ...defaultState, destinationPlanet: planet, originPlanet: planet }, unsetPlanets());
    expect(result.originPlanet).not.toBeDefined();
    expect(result.destinationPlanet).not.toBeDefined();
  });

  it("Could clear turn data", (): void => {
    const result = turn({ ...defaultState, destinationPlanet: planet, originPlanet: planet, currentShipsModifier: { A: 10 } }, clearTurnData());
    expect(result.originPlanet).not.toBeDefined();
    expect(result.destinationPlanet).not.toBeDefined();
    expect(result.currentShipsModifier.A).not.toBeDefined();
  });

  it("Could add player turn order and update ship modifiers", (): void => {
    const result = turn(defaultState, addPlayerTurnOrder(order));
    expect(result.currentPlayerOrders).toHaveLength(1);
    expect(result.currentPlayerOrders[0]).toMatchObject(order);
    expect(result.currentShipsModifier.A).toBe(order.amount);
  });

  it("Could remove order and update modifiers accordingly", (): void => {
    const result = turn({ ...defaultState, currentShipsModifier: { A: 10 }, currentPlayerOrders: [order] }, removePlayerTurnOrder(0));
    expect(result.currentPlayerOrders).toHaveLength(0);
    expect(result.currentShipsModifier.A).not.toBeDefined();
  });
});
