import React, { ReactElement } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Tooltip } from "react-tippy";
import { css } from "emotion";

import { setDestinationPlanet, setOriginPlanet } from "../actions/turn.actions";

import Planet from "../../logic/Planet";

import "react-tippy/dist/tippy.css";
import planetSelector, { PlanetStoreSlice } from "../selectors/planet.selector";
import PlanetImage from "./PlanetImage";
import PlanetTooltipContent from "./PlanetTooltipContent";
import hexToRgba from "./helpers/hexToRgba";

export interface PlanetProps {
  planet: Planet;
  blockSize: number;
}

const PlanetElement = ({ planet, blockSize }: PlanetProps): ReactElement => {
  const { originPlanet, activePlayer, destinationPlanet, currentShipsModifier }: PlanetStoreSlice = useSelector(planetSelector, shallowEqual);
  const dispatch = useDispatch();

  const planetBorderSize = Math.floor(blockSize * 0.15);
  const imageSize = blockSize - planetBorderSize * 2;

  const isPlayerPlanet = planet.owner && planet.owner.id === activePlayer.id;
  const isOriginPlanet = originPlanet && originPlanet.name === planet.name;
  const isDestinationPlanet = destinationPlanet && destinationPlanet.name === planet.name;

  const onPlanetSelect = (): void => {
    if (!originPlanet && (!planet.owner || planet.owner.id !== activePlayer.id)) {
      // origin should belong to player
      return;
    } else if (!originPlanet && planet.owner && planet.owner.id === activePlayer.id) {
      dispatch(setOriginPlanet(planet));
    } else if (originPlanet && !destinationPlanet) {
      dispatch(setDestinationPlanet(planet));
    } else {
      if (planet.owner && planet.owner.id === activePlayer.id) {
        dispatch(setOriginPlanet(planet));
        dispatch(setDestinationPlanet(undefined));
      }
    }
  };

  return (
    <div
      data-testid="planet"
      className={css`
        position: absolute;
        cursor: pointer;
        top: ${planet.coordinates.x * blockSize - 1}px;
        left: ${planet.coordinates.y * blockSize}px;
        width: ${blockSize - 1}px;
        height: ${blockSize - 1}px;
        background: ${isDestinationPlanet
          ? `rgba(${hexToRgba("#0000ff", "0.3")})`
          : isOriginPlanet
          ? `rgba(${hexToRgba("#00ff00", "0.3")})`
          : isPlayerPlanet
          ? `rgba(${hexToRgba("#ff0000", "0.3")})`
          : "none"};

        :hover {
          background: rgba(${hexToRgba(isOriginPlanet ? "#00ff00" : originPlanet ? "#0000ff" : isPlayerPlanet ? "#ff0000" : "#fff", "0.3")});
        }
      `}
      onClick={onPlanetSelect}
    >
      <Tooltip
        position="top"
        animation="fade"
        arrow="true"
        animateFill="false"
        html={<PlanetTooltipContent planet={planet} modifier={currentShipsModifier[planet.name]} />}
        className={css`
          position: absolute;
          top: ${planetBorderSize}px;
          left: ${planetBorderSize}px;
          width: ${imageSize}px;
          height: ${imageSize}px;
          border-radius: ${blockSize}px;
        `}
      >
        <PlanetImage radius={imageSize / 2} mainColor={planet.mainColor} />
        <span
          className={css`
            position: absolute;
            bottom: 0px;
            right: 0px;
            z-index: 999;
          `}
        >
          {planet.name}
        </span>
      </Tooltip>
    </div>
  );
};

export default PlanetElement;
