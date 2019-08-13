import getPlanetName from "./getPlanetName";
import { PlanetMap } from "../Planet";

export interface PlacePlayerPlanetsOptions {
  planets: PlanetMap;
  fieldWidth: number;
  fieldHeight: number;
  playerCount: number;
}

const placePlayerPlanets = ({ planets, fieldWidth, fieldHeight, playerCount }: PlacePlayerPlanetsOptions): void => {
  // for now stick to the corners
  const corners = {
    A: { x: 0, y: 0 },
    B: { x: fieldWidth - 1, y: fieldHeight - 1 },
    C: { x: 0, y: fieldHeight - 1 },
    D: { x: fieldWidth - 1, y: 0 }
  };
  // grab available planets and update their coordinates
  for (let i = 0; i < playerCount; i++) {
    const name = getPlanetName(i);
    const planet = planets[name];
    planet.coordinates = corners[name];
  }
};

export default placePlayerPlanets;
