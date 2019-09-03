import { PlayerTurnOrder } from "../../logic/Player";
import Planet from "../../logic/Planet";

/*
 * action types
 */
export enum TurnActionTypes {
  SET_ORIGIN_PLANET = "SET_ORIGIN_PLANET",
  SET_DESTINATION_PLANET = "SET_DESTINATION_PLANET",
  ADD_PLAYER_TURN_ORDER = "ADD_PLAYER_TURN_ORDER",
  REMOVE_PLAYER_TURN_ORDER = "REMOVE_PLAYER_TURN_ORDER",
  CLEAR_TURN_DATA = "CLEAR_TURN_DATA",
  UNSET_PLANETS = "UNSET_PLANETS"
}

export interface SetPlanetAction {
  type: typeof TurnActionTypes.SET_ORIGIN_PLANET | typeof TurnActionTypes.SET_DESTINATION_PLANET;
  planet?: Planet;
}

export interface AddPlayerTurnOrderAction {
  type: typeof TurnActionTypes.ADD_PLAYER_TURN_ORDER;
  order: PlayerTurnOrder;
}

export interface ClearTurnDataAction {
  type: typeof TurnActionTypes.CLEAR_TURN_DATA;
}

export interface RemovePlayerTurnOrderAction {
  type: typeof TurnActionTypes.REMOVE_PLAYER_TURN_ORDER;
  index: number;
}

export interface UnsetPlanetsAction {
  type: typeof TurnActionTypes.UNSET_PLANETS;
}

/*
 * action creators
 */
export function setOriginPlanet(planet?: Planet): SetPlanetAction {
  return { type: TurnActionTypes.SET_ORIGIN_PLANET, planet };
}

export function setDestinationPlanet(planet?: Planet): SetPlanetAction {
  return { type: TurnActionTypes.SET_DESTINATION_PLANET, planet };
}

export function addPlayerTurnOrder(order: PlayerTurnOrder): AddPlayerTurnOrderAction {
  return { type: TurnActionTypes.ADD_PLAYER_TURN_ORDER, order };
}

export function removePlayerTurnOrder(index: number): RemovePlayerTurnOrderAction {
  return { type: TurnActionTypes.REMOVE_PLAYER_TURN_ORDER, index };
}

export function clearTurnData(): ClearTurnDataAction {
  return { type: TurnActionTypes.CLEAR_TURN_DATA };
}

export function unsetPlanets(): UnsetPlanetsAction {
  return { type: TurnActionTypes.UNSET_PLANETS };
}
