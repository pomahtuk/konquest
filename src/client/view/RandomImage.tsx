import React, { ReactElement, useRef, useEffect } from "react";
// import Color from "color";
import { css } from "emotion";
import randomColor from "randomcolor";

import renderSvg from "../proceduralGeneration/svgRenderer";

export interface RandomImageProps {
  imageKey: string;
}

const RandomImage = ({ imageKey }: RandomImageProps): ReactElement => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canvasRef && canvasRef.current !== null) {
      renderSvg(canvasRef.current, 40, randomColor({ luminosity: "dark" }));
    }
  }, [imageKey, canvasRef]);

  return (
    <div
      ref={canvasRef}
      className={css`
        border-radius: 40px;
        overflow: hidden;
        width: 40px;
        height: 40px;
      `}
    />
  );
};

export default RandomImage;
