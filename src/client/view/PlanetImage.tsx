import React, { ReactElement } from "react";

const LIGHT_COLOR = "#ccc";

export interface PlanetImageProps {
  mainColor: string;
  radius: number;
}

const PlanetImage = ({ radius, mainColor }: PlanetImageProps): ReactElement => {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id={`main_shadow-${mainColor}`}>
          <stop stopColor={LIGHT_COLOR} offset="0"></stop>
          <stop stopColor={mainColor} offset="0.6"></stop>
        </linearGradient>
      </defs>
      <g transform={`rotate(60, ${radius} ${radius})`}>
        <circle r={radius} cx={radius} cy={radius} fill={`url(#main_shadow-${mainColor})`}></circle>
      </g>
    </svg>
  );
};

export default PlanetImage;
