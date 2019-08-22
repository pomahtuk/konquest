import { LAYER_DRAW_FUNCTIONS } from "./layers";

import { randomInt } from "./random";
import { GlobalOptions } from "./types";

const renderImage = (globalOptions: GlobalOptions, canvas: HTMLCanvasElement): void => {
  canvas.width = globalOptions.width;
  canvas.height = globalOptions.height;

  const context = canvas.getContext("2d");

  const getRandomColor = (): string => globalOptions.palette[randomInt(0, globalOptions.palette.length - 1)].hex();

  globalOptions.layers.forEach((layer) => {
    if (LAYER_DRAW_FUNCTIONS[layer.type]) {
      LAYER_DRAW_FUNCTIONS[layer.type](layer.options, globalOptions, context, getRandomColor);
    }
  });
};

export default renderImage;
