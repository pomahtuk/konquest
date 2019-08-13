import getPlanetName from "./getPlanetName";
import { PlanetMap } from "../Planet";

export interface PlaceNeutralPlanetsParams {
  planets: PlanetMap;
  fieldWidth: number;
  fieldHeight: number;
  planetCount: number;
  playerCount: number;
}

const placeNeutralPlanets = ({ planets, fieldWidth, fieldHeight, planetCount, playerCount }: PlaceNeutralPlanetsParams): void => {
  // we could assume we are dealing with square
  const fieldSize = fieldWidth * fieldHeight;
  const targetSubSquareSide = (fieldSize / planetCount) ** 0.5;
  const leftover = fieldWidth % targetSubSquareSide;

  // now actually we know size of
  let squareOffsetX = 0;
  let squareOffsetY = 0;
  let axisMaxX = fieldWidth;
  const axisMaxY = fieldHeight;
  for (let i = 0; i < planetCount - playerCount; i++) {
    // iterate over planets
    const planetName = getPlanetName(playerCount + i);
    const planet = planets[planetName];
    // random things to space out
    // start increasing
    squareOffsetX += targetSubSquareSide;
    // in case we have 4 players - top right corner have to be vacant
    if (squareOffsetY === 0 && playerCount === 4) {
      axisMaxX = fieldWidth - targetSubSquareSide;
    } else {
      axisMaxX = fieldWidth;
    }
    if (squareOffsetX + targetSubSquareSide > axisMaxX) {
      // We need to avoid not only top left corner, but others as well
      squareOffsetX = 0;
      squareOffsetY += targetSubSquareSide;
      if (squareOffsetY + targetSubSquareSide > axisMaxY) {
        squareOffsetY = axisMaxY - targetSubSquareSide;
      }
      if (squareOffsetX === 0 && playerCount >= 3 && squareOffsetY >= fieldHeight - leftover - targetSubSquareSide) {
        // in case we have 3 players - bottom left corner have to be free
        squareOffsetX += targetSubSquareSide;
      }
    }

    planet.coordinates = {
      x: Math.floor(squareOffsetX + Math.random() * targetSubSquareSide),
      y: Math.floor(squareOffsetY + Math.random() * targetSubSquareSide)
    };
  }
};

export default placeNeutralPlanets;
