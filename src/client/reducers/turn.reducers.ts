import { PlayerTurnOrder } from "../../logic/Player";
import Planet from "../../logic/Planet";

import {
  SetPlanetAction,
  AddPlayerTurnOrderAction,
  TurnActionTypes,
  ClearTurnDataAction,
  RemovePlayerTurnOrderAction,
  UnsetPlanetsAction
} from "../actions/turn.actions";

export interface TurnStoreData {
  originPlanet?: Planet;
  destinationPlanet?: Planet;
  turnError: boolean;
  currentPlayerOrders: PlayerTurnOrder[];
  currentShipsModifier: { [key: string]: number };
}

const defaultState: TurnStoreData = {
  originPlanet: undefined,
  destinationPlanet: undefined,
  turnError: false,
  currentPlayerOrders: [],
  currentShipsModifier: {}
};

const calculateShipModifiers = (orderList: PlayerTurnOrder[]): { [key: string]: number } =>
  orderList.reduce((acc, order): { [key: string]: number } => {
    acc[order.origin] = (acc[order.origin] || 0) + order.amount;
    return acc;
  }, {});

function turn(
  state: TurnStoreData = defaultState,
  action: SetPlanetAction | AddPlayerTurnOrderAction | ClearTurnDataAction | RemovePlayerTurnOrderAction | UnsetPlanetsAction
): TurnStoreData {
  let orderList = [];
  switch (action.type) {
    case TurnActionTypes.SET_ORIGIN_PLANET:
      return {
        ...state,
        originPlanet: action.planet
      };
    case TurnActionTypes.SET_DESTINATION_PLANET:
      return {
        ...state,
        destinationPlanet: action.planet
      };
    case TurnActionTypes.ADD_PLAYER_TURN_ORDER:
      orderList = [...state.currentPlayerOrders, action.order];
      return {
        ...state,
        currentPlayerOrders: orderList,
        currentShipsModifier: calculateShipModifiers(orderList)
      };
    case TurnActionTypes.REMOVE_PLAYER_TURN_ORDER:
      orderList = [...state.currentPlayerOrders.slice(0, action.index), ...state.currentPlayerOrders.slice(action.index + 1)];
      return {
        ...state,
        currentPlayerOrders: orderList,
        currentShipsModifier: calculateShipModifiers(orderList)
      };
    case TurnActionTypes.CLEAR_TURN_DATA:
      return { ...defaultState };
    case TurnActionTypes.UNSET_PLANETS:
      return {
        ...state,
        originPlanet: undefined,
        destinationPlanet: undefined
      };
    default:
      return state;
  }
}

export default turn;
