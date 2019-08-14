export interface Point {
  x: number;
  y: number;
}

const unitsPerTurnTravelSpeed = 4;
const getDistanceBetweenPoints = (A: Point, B: Point): number =>
  Math.floor(Math.round(Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2)) / unitsPerTurnTravelSpeed);

export default getDistanceBetweenPoints;
