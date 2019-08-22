import React, { ReactElement } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Tooltip } from "react-tippy";

import { setDestinationPlanet, setOriginPlanet } from "../actions/game.actions";

import Planet from "../../logic/Planet";

import "react-tippy/dist/tippy.css";
import planetSelectorFunction, { PlanetStoreSlice } from "../selectors/planet.selector";
import RandomImage from "./RandomImage";

export interface PlanetProps {
  planet: Planet;
}

const PlanetElement = ({ planet }: PlanetProps): ReactElement => {
  const { originPlanet, activePlayer, destinationPlanet, currentShipsModifier }: PlanetStoreSlice = useSelector(planetSelectorFunction, shallowEqual);
  const dispatch = useDispatch();

  if (!planet) {
    return <span>·</span>;
  }

  const onPlanetSelect = (): void => {
    if (!originPlanet && (!planet.owner || planet.owner.id !== activePlayer.id)) {
      // origin should belong to player
      return;
    } else if (!originPlanet && planet.owner && planet.owner.id === activePlayer.id) {
      dispatch(setOriginPlanet(planet));
    } else if (originPlanet && !destinationPlanet) {
      dispatch(setDestinationPlanet(planet));
    } else if (planet.owner && planet.owner.id === activePlayer.id) {
      dispatch(setOriginPlanet(planet));
      dispatch(setDestinationPlanet(undefined));
    }
  };

  return (
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
          <div>Ships: {planet.ships - (currentShipsModifier[planet.name] || 0)}</div>
        </div>
      }
      style={{
        position: "absolute",
        top: planet.coordinates.x * 60 - 10,
        left: planet.coordinates.y * 60 - 10,
        width: 60,
        height: 60
      }}
    >
      <div
        style={{
          cursor: "pointer",
          position: "relative",
          top: 10,
          left: 10,
          width: 40,
          height: 40
        }}
        onClick={onPlanetSelect}
      >
        <RandomImage imageKey={planet.name}></RandomImage>
        <span
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 999
          }}
        >
          {planet.name}
        </span>
        <br />
      </div>
    </Tooltip>
  );
};

export default PlanetElement;
