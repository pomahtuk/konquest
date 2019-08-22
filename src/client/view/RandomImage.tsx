import React, { ReactElement, useRef, useEffect } from "react";
import Color from "color";

import renderImage from "../proceduralGeneration/imageRenderer";
import { LAYER_DEFAULT_OPTIONS } from "../proceduralGeneration/layers";
import { LayerType } from "../proceduralGeneration/types";

const globalOptions = {
  width: 40,
  height: 40,
  layers: [
    {
      type: "linear-gradient" as LayerType,
      options: LAYER_DEFAULT_OPTIONS["linear-gradient"]
    },
    {
      type: "radial-gradients" as LayerType,
      options: LAYER_DEFAULT_OPTIONS["radial-gradients"]
    },
    {
      type: "color-strips" as LayerType,
      options: LAYER_DEFAULT_OPTIONS["color-strips"]
    },
    {
      type: "blur" as LayerType,
      options: LAYER_DEFAULT_OPTIONS["blur"]
    }
  ],
  palette: [new Color("#7743CE"), new Color("#008009"), new Color("#003580"), new Color("#CC0000")]
};

export interface RandomImageProps {
  imageKey: string;
}

const RandomImage = ({ imageKey }: RandomImageProps): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef && canvasRef.current !== null) {
      renderImage(globalOptions, canvasRef.current);
    }
  }, [imageKey, canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      width={globalOptions.width}
      height={globalOptions.height}
      style={{ borderRadius: globalOptions.width, overflow: "hidden" }}
    ></canvas>
  );
};

export default RandomImage;
