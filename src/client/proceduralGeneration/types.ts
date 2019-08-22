import Color from "color";

export type LinearGradientLayerOptions = {
  opacityRange: [number, number];
};

export type RadialGradientLayerOptions = {
  amountRange: [number, number];
  radiusRange: [number, number];
  radialType: "both" | "circle" | "square";
};

export type ColorStripsLayerOptions = {
  amountRange: [number, number];
  widthRange: [number, number];
  opacityRange: [number, number];
  shadowRadiusRange: [number, number];
  shadowStrengthRange: [number, number];
};

export type BlurLayerOptions = {
  radiusRange: [number, number];
};

export type DefaultLayerOptions = {
  "linear-gradient": LinearGradientLayerOptions;
  "radial-gradients": RadialGradientLayerOptions;
  "color-strips": ColorStripsLayerOptions;
  blur: BlurLayerOptions;
};

export type LayerType = "linear-gradient" | "radial-gradients" | "color-strips" | "blur";
export type LayerOptions = LinearGradientLayerOptions | RadialGradientLayerOptions | ColorStripsLayerOptions | BlurLayerOptions;

export type Layer = {
  type: LayerType;
  options: LayerOptions;
};

export type GlobalOptions = {
  width: number;
  height: number;
  palette: Color[];
  layers: Layer[];
};

export type LayerDrawFunctions = {
  [key: string]: (
    layerOptions: LayerOptions,
    globalOptions: GlobalOptions,
    context: CanvasRenderingContext2D | null,
    getRandomColor?: () => string
  ) => void;
};
