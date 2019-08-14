import { PlayerTurn } from "../Game";
import { PlanetMap } from "../Planet";

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

const validateTurnData = ({ playerId, orders }: PlayerTurn, planets: PlanetMap): ValidationResult => {
  if (!playerId) {
    return {
      valid: false,
      error: "Player must be specified"
    };
  }
  // check if all fields are filled
  if (!orders || orders.length === 0) {
    // we don't have orders, might be normal
    return {
      valid: true
    };
  }

  const modifiers: { [key: string]: number } = {};
  for (const order of orders) {
    if (!order.origin || !planets[order.origin]) {
      return {
        valid: false,
        error: "Origin planet is not specified or not available in game"
      };
    }
    if (!order.destination || !planets[order.destination]) {
      return {
        valid: false,
        error: "Destination planet is not specified or not available in game"
      };
    }
    const origin = planets[order.origin];
    if (!origin.owner || origin.owner.id !== playerId) {
      return {
        valid: false,
        error: "Origin planet does not belong to player!"
      };
    }
    const planetShipModifier = modifiers[origin.name] || 0;
    if (origin.ships - planetShipModifier < order.amount) {
      return {
        valid: false,
        error: "Origin planet have less ships than required"
      };
    }
    modifiers[origin.name] = planetShipModifier + order.amount;
  }

  return {
    valid: true
  };
};

export default validateTurnData;
