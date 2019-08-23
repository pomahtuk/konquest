import React, { ReactElement } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Tooltip } from "react-tippy";
import { css } from "emotion";

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

  const isSelected = (originPlanet && originPlanet.name === planet.name) || (destinationPlanet && destinationPlanet.name === planet.name);

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
      className={css`
        position: absolute;
        top: ${planet.coordinates.x * 60 - 10}px;
        left: ${planet.coordinates.y * 60 - 10}px;
        width: 60px;
        height: 60px;
      `}
    >
      <div
        className={css`
          cursor: pointer;
          position: relative;
          top: 10px;
          left: 10px;
          width: 40px;
          height: 40px;
          border-radius: 40px;

          :hover {
            box-shadow: 0px 0px 3px 2px ${isSelected ? "green" : "magenta"};
          }
        `}
        onClick={onPlanetSelect}
      >
        <RandomImage imageKey={planet.name}></RandomImage>
        <span
          className={css`
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: 999;
          `}
        >
          {planet.name}
        </span>
        <br />
      </div>
    </Tooltip>
  );
};

export default PlanetElement;
