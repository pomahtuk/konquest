import getPlanetName from "./getPlanetName";
import { PlanetMap } from "../Planet";

export interface PlaceNeutralPlanetsParams {
  planets: PlanetMap;
  fieldWidth: number;
  fieldHeight: number;
  planetCount: number;
}

export interface Point {
  x: number;
  y: number;
}

const placePlanets = ({ planets, fieldWidth, fieldHeight, planetCount }: PlaceNeutralPlanetsParams): void => {
  const matrix: boolean[][] = Array.from(new Array(fieldHeight)).map((): boolean[] => new Array(fieldHeight).fill(false));
  // this is fully random as this is how it is done in KDE

  // place planet on random, update location in matrix;
  const getRandomCoords = (): Point => ({
    x: Math.round(Math.random() * (fieldWidth - 1)),
    y: Math.round(Math.random() * (fieldHeight - 1))
  });

  const getFreeCoords = (): Point => {
    const coords = getRandomCoords();
    if (!matrix[coords.x][coords.y]) {
      // nothing there
      matrix[coords.x][coords.y] = true;
      return coords;
    }
    return getFreeCoords();
  };

  for (let i = 0; i < planetCount; i++) {
    // iterate over planets
    const planetName = getPlanetName(i);
    const planet = planets[planetName];
    planet.coordinates = getFreeCoords();
  }
};

export default placePlanets;
