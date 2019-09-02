import ComputerPlayer, { ComputerPlayerType } from "./ComputerPlayer";
import Planet, { PlanetMap } from "./Planet";
import { PlayerTurnOrder } from "./Player";
import getDistanceBetweenPoints from "./helpers/getDistanceBetweenPoints";
import Fleet from "./Fleet";

class ComputerPlayerEasy extends ComputerPlayer {
  protected minimumShips = 20;
  protected shipCountFactor = 2;

  constructor(name: string) {
    super(name, ComputerPlayerType.EASY);
  }

  public takeTurn(planets: PlanetMap, fleets: Fleet[]): PlayerTurnOrder[] {
    const orders: PlayerTurnOrder[] = [];

    const planetList: Planet[] = Object.keys(planets).map((planetName) => planets[planetName]);

    for (const origin of planetList) {
      if (origin.owner && origin.owner.id === this.id) {
        let shouldAttack = false;
        let shipsToSend = Math.floor(origin.ships * 0.7);
        let destinationName = "";
        let minDistance = 1;

        if (shipsToSend >= this.minimumShips) {
          for (const destination of planetList) {
            if (destination.owner && destination.owner.id === this.id) {
              continue;
            }

            const distance = getDistanceBetweenPoints(origin.coordinates, destination.coordinates);

            if (distance < minDistance && destination.ships < shipsToSend) {
              if (this.shouldSkipPlanet(destination.name, orders, fleets)) {
                continue;
              }

              minDistance = distance;
              shouldAttack = true;
              destinationName = destination.name;
            }
          }
        }

        if (shouldAttack) {
          orders.push({
            origin: origin.name,
            destination: destinationName,
            amount: shipsToSend
          });
        } else {
          minDistance = Number.MAX_VALUE;
          shipsToSend = 0;
          let hasDestination = false;

          for (const destination of planetList) {
            const distance = getDistanceBetweenPoints(origin.coordinates, destination.coordinates);
            const homeShips = Math.floor(origin.ships * 0.5);

            if (distance < minDistance && destination.owner && destination.owner.id === this.id && destination.ships < homeShips) {
              if (this.shouldSkipPlanet(destination.name, orders, fleets)) {
                continue;
              }

              shipsToSend = Math.floor((origin.ships - destination.ships) / this.shipCountFactor);

              destinationName = destination.name;
              hasDestination = true;
              minDistance = distance;
            }
          }

          if (hasDestination) {
            orders.push({
              origin: origin.name,
              destination: destinationName,
              amount: shipsToSend
            });
          }
        }
      }
    }

    return orders;
  }
}

export default ComputerPlayerEasy;
