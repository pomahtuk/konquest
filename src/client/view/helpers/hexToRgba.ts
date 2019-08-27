import hexRgb from "hex-rgb";

const hexToRgba = (hex: string, alpha: string): string => [...hexRgb(hex, { format: "array" }).slice(0, -1), alpha].join(", ");

export default hexToRgba;
