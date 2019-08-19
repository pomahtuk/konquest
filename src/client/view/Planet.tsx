import React, { ReactElement } from "react";
import { Tooltip } from "react-tippy";

import Planet from "../../logic/Planet";

import "react-tippy/dist/tippy.css";

export interface PlanetProps {
  planet: Planet;
  isDestination: boolean;
  isOrigin: boolean;
  modifier?: number;
  onSelect: (planet: Planet) => void;
}

const PlanetElement = ({ planet, isDestination, isOrigin, modifier = 0, onSelect }: PlanetProps): ReactElement =>
  planet ? (
    <Tooltip
      position="top"
      animation="fade"
      arrow="true"
      animateFill="false"
      html={
        <div>
          <div>Owner: {planet.owner ? planet.owner.screenName : "none"}</div>
          <div>Production: {planet.production}</div>
          <div>Kill percent: {planet.killPercent}</div>
        </div>
      }
    >
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
    </Tooltip>
  ) : (
    <span>·</span>
  );

export default PlanetElement;
