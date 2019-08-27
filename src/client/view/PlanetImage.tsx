import React, { ReactElement, useState } from "react";
import randomColor from "randomcolor";

const PlanetImage = (): ReactElement => {
  const [mainColor] = useState(randomColor({ luminosity: "dark" }));
  const lightColor = "#dddddd";
  return (
    <svg width="100%" height="100%">
      <defs>
        <radialGradient id="circle_shadow" r="0.1" cx="0.75" cy="0.3">
          <stop stopColor={mainColor} offset="100"></stop>
          <stop stopColor={lightColor} offset="1"></stop>
        </radialGradient>
        <linearGradient id="main_shadow">
          <stop stopColor={lightColor} offset="0"></stop>
          <stop stopColor={mainColor} offset="0.7"></stop>
        </linearGradient>
      </defs>
      <g transform="matrix(0.5000000000000001,0.8660254037844386,-0.8660254037844386,0.5000000000000001,27.32050807568877,-7.320508075688771)">
        <circle r="20" cx="20" cy="20" fill="url(#circle_shadow)" opacity="0.9"></circle>
        <circle r="20" cx="20" cy="20" opacity="0.4" fill="url(#main_shadow)" comp-op="hard-light"></circle>
      </g>
    </svg>
  );
};

export default PlanetImage;
