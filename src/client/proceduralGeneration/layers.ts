import * as StackBlur from "stackblur-canvas";
import Color from "color";
import { randomBool, randomInt, randomFloat } from "./random";
import {
  DefaultLayerOptions,
  LinearGradientLayerOptions,
  GlobalOptions,
  LayerDrawFunctions,
  RadialGradientLayerOptions,
  ColorStripsLayerOptions,
  BlurLayerOptions
} from "./types";

const percentOf = (percent: number, num: number): number => (percent / 100) * num;

export const LAYER_NAMES = {
  "linear-gradient": "Linear Gradient",
  "radial-gradients": "Radial Gradients",
  "color-strips": "Color Strips",
  blur: "Blur",
  noise: "Noise",
  vignette: "Vignette"
};

export const LAYER_DEFAULT_OPTIONS: DefaultLayerOptions = {
  "linear-gradient": {
    opacityRange: [70, 100] // Percentage of 1
  },
  "radial-gradients": {
    amountRange: [0, 40],
    radiusRange: [0, 80], // Percentage of image width
    radialType: "both" // or 'circle' or 'square'
  },
  "color-strips": {
    amountRange: [2, 10],
    widthRange: [8, 15], // Percentage of image width
    opacityRange: [20, 100], // Percentage of 1
    shadowRadiusRange: [1, 3], // Percentage of image width
    shadowStrengthRange: [30, 100] // Percentage of 1
  },
  blur: {
    radiusRange: [100, 180]
  }
};

export const LAYER_DRAW_FUNCTIONS: LayerDrawFunctions = {
  "linear-gradient": (
    layerOptions: LinearGradientLayerOptions,
    globalOptions: GlobalOptions,
    context: CanvasRenderingContext2D,
    getRandomColor: () => string
  ): void => {
    if (!context) {
      return;
    }

    const w = globalOptions.width;
    const h = globalOptions.height;

    context.save();

    const gradient = context.createLinearGradient(
      percentOf(randomInt(0, 100), w),
      percentOf(randomInt(0, 100), h),
      percentOf(randomInt(0, 100), w),
      percentOf(randomInt(0, 100), h)
    );

    const color1 = new Color(getRandomColor()).fade(1 - randomInt(layerOptions.opacityRange[0], layerOptions.opacityRange[1]) / 100);

    const color2 = new Color(getRandomColor()).fade(1 - randomInt(layerOptions.opacityRange[0], layerOptions.opacityRange[1]) / 100);

    gradient.addColorStop(0, color1.rgb().string());
    gradient.addColorStop(1, color2.rgb().string());

    context.fillStyle = gradient;
    context.fillRect(0, 0, globalOptions.width, globalOptions.height);

    context.restore();
  },

  "radial-gradients": (
    layerOptions: RadialGradientLayerOptions,
    globalOptions: GlobalOptions,
    context: CanvasRenderingContext2D,
    getRandomColor: () => string
  ): void => {
    if (!context) {
      return;
    }

    const w = globalOptions.width;
    const h = globalOptions.height;

    context.save();

    for (let i = 0; i < randomInt(layerOptions.amountRange[0], layerOptions.amountRange[1]); ++i) {
      const radius = percentOf(randomInt(layerOptions.radiusRange[0], layerOptions.radiusRange[1]), w);

      // Whether or not to generated inverted radial gradients (they look like hollowed squares)
      let isSquare = false;

      if (layerOptions.radialType === "both") {
        isSquare = randomBool();
      } else {
        isSquare = layerOptions.radialType === "square";
      }

      const pos = [percentOf(randomInt(-5, 105), w), percentOf(randomInt(-5, 105), h)];
      // create radial gradient
      const gradient = context.createRadialGradient(pos[0] + radius, pos[1] + radius, 10, pos[0] + radius, pos[1] + radius, radius);

      const color = new Color(getRandomColor()).fade(randomFloat(0.1, 1));

      gradient.addColorStop(isSquare ? 1 : 0, color.rgb().string());

      gradient.addColorStop(isSquare ? 0 : 1, "rgba(0, 0, 0, 0)");

      context.fillStyle = gradient;
      context.fillRect(pos[0], pos[1], radius * 2, radius * 2);
    }

    context.restore();
  },

  "color-strips": (
    layerOptions: ColorStripsLayerOptions,
    globalOptions: GlobalOptions,
    context: CanvasRenderingContext2D,
    getRandomColor: () => string
  ): void => {
    if (!context) {
      return;
    }

    const w = globalOptions.width;
    const h = globalOptions.height;
    const stripWidth = percentOf(randomInt(layerOptions.widthRange[0], layerOptions.widthRange[1]), w);

    const rotation = randomInt(-180, 180) * (Math.PI / 180);

    const dimensions = [stripWidth, w * 2];

    const totalStripCount = randomInt(layerOptions.amountRange[0], layerOptions.amountRange[1]);
    const gap = stripWidth;
    const xOffset = percentOf(randomInt(-50, 50), w);
    const startPosition = [-(totalStripCount * gap) / 2 + xOffset, -(dimensions[1] / 2)];

    context.save();

    context.translate(w / 2, h / 2);
    context.rotate(rotation);

    for (let i = 0; i < totalStripCount; i++) {
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.shadowBlur = percentOf(randomFloat(layerOptions.shadowRadiusRange[0], layerOptions.shadowRadiusRange[1]), w);
      context.shadowColor = `rgba(0, 0, 0, ${randomInt(layerOptions.shadowStrengthRange[0], layerOptions.shadowStrengthRange[1]) / 100})`;
      context.fillStyle = new Color(getRandomColor())
        .fade(1 - randomInt(layerOptions.opacityRange[0], layerOptions.opacityRange[1]) / 100)
        .rgb()
        .string();
      context.fillRect(startPosition[0] + gap * i, startPosition[1], dimensions[0], dimensions[1]);
    }

    context.restore();
  },

  blur: (layerOptions: BlurLayerOptions, globalOptions: GlobalOptions, context: CanvasRenderingContext2D): void => {
    if (!context) {
      return;
    }

    const w = globalOptions.width;
    const h = globalOptions.height;

    const imageData = context.getImageData(0, 0, w, h);
    // Blur using the stackblur library.
    const blurredData = StackBlur.imageDataRGBA(imageData, 0, 0, w, h, randomInt(layerOptions.radiusRange[0], layerOptions.radiusRange[1]));

    context.putImageData(blurredData, 0, 0);
  }
};
