import React, { ReactElement } from "react";
import Planet from "../../logic/Planet";

export interface PlanetProps {
  planet: Planet;
  isDestination: boolean;
  isOrigin: boolean;
  modifier?: number;
  onSelect: (planet: Planet) => void;
}

const PlanetElement = ({ planet, isDestination, isOrigin, modifier = 0, onSelect }: PlanetProps): ReactElement =>
  planet ? (
    <span
      style={{
        color: planet.owner ? "red" : isOrigin ? "blue" : isDestination ? "green" : "inherit",
        cursor: "pointer"
      }}
      onClick={(): void => onSelect(planet)}
    >
      {planet.name}
      <br />
      {planet.ships - modifier}
    </span>
  ) : (
    <span>·</span>
  );

export default PlanetElement;
