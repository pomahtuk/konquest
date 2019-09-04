type Sizes = "smallest" | "smaller" | "small" | "medium" | "large" | "larger" | "largest";

type Colors =
  | "destructiveDark"
  | "destructive"
  | "destructiveLight"
  | "destructiveLighter"
  | "destructiveLightest"
  | "calloutDark"
  | "callout"
  | "calloutLight"
  | "calloutLighter"
  | "calloutLightest"
  | "complementDark"
  | "complement"
  | "complementLight"
  | "complementLighter"
  | "complementLightest"
  | "constructiveDark"
  | "constructive"
  | "constructiveLight"
  | "constructiveLighter"
  | "constructiveLightest"
  | "primaryDark"
  | "primary"
  | "primaryLight"
  | "primaryLighter"
  | "primaryLightest"
  | "grayscaleDark"
  | "grayscale"
  | "grayscaleLight"
  | "grayscaleLighter"
  | "grayscaleLightest"
  | "black"
  | "white"
  | "actionDark"
  | "action"
  | "actionLight"
  | "actionLighter";

type FontWeights = "normal" | "medium" | "bold";

type FontStacks = "sans" | "serif" | "mono";

type ZIndex = "0" | "1" | "2" | "3" | "4";

type Medias = "small" | "medium" | "large" | "huge";

export interface Theme {
  fontSizes: {
    [key in Sizes]: string;
  };
  lineHeights: {
    [key in Sizes]: string;
  };
  fontWeights: {
    [key in FontWeights]: string;
  };
  fontStacks: {
    [key in FontStacks]: string;
  };
  zIndex: {
    [key in ZIndex]: number;
  };
  colors: {
    [key in Colors]: string;
  };
  units: {
    [key in Sizes]: string;
  };
  media: {
    [key in Medias]: string;
  };
}

const baseTheme: Theme = {
  fontSizes: {
    smallest: "10px",
    smaller: "12px",
    small: "14px",
    medium: "16px",
    large: "20px",
    larger: "24px",
    largest: "32px"
  },
  lineHeights: {
    smallest: "16px",
    smaller: "18px",
    small: "20px",
    medium: "24px",
    large: "28px",
    larger: "32px",
    largest: "40px"
  },
  fontWeights: {
    normal: "400",
    medium: "500",
    bold: "700"
  },
  fontStacks: {
    sans: '"BlinkMacSystemFont", -apple-system, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif;',
    serif: '"Georgia", serif',
    mono: '"Monaco", "Courier New", monospace'
  },
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 400
  },
  media: {
    small: "@media screen and (max-width: 575px)",
    medium: "@media screen and (min-width: 576px)",
    large: "@media screen and (min-width: 992px)",
    huge: "@media screen and (min-width: 1200px)"
  },
  colors: {
    destructiveDark: "#A30000",
    destructive: "#CC0000",
    destructiveLight: "#FCB4B4",
    destructiveLighter: "#FFEBEB",
    destructiveLightest: "#FFF0F0",

    calloutDark: "#BC5B01",
    callout: "#FF8000",
    calloutLight: "#FFC489",
    calloutLighter: "#FFF0E0",
    calloutLightest: "#FFF8F0",

    complementDark: "#CD8900",
    complement: "#FEBB02",
    complementLight: "#FFE08A",
    complementLighter: "#FDF4D8",
    complementLightest: "#FEFBF0",

    constructiveDark: "#006607",
    constructive: "#008009",
    constructiveLight: "#97E59C",
    constructiveLighter: "#E7FDE9",
    constructiveLightest: "#F1FEF2",

    primaryDark: "#00224F",
    primary: "#003580",
    primaryLight: "#BAD4F7",
    primaryLighter: "#EBF3FF",
    primaryLightest: "#FAFCFF",

    grayscaleDark: "#333333",
    grayscale: "#6B6B6B",
    grayscaleLight: "#BDBDBD",
    grayscaleLighter: "#E6E6E6",
    grayscaleLightest: "#F5F5F5",

    black: "#000",
    white: "#fff",

    actionDark: "#005C9D",
    action: "#0071C2",
    actionLight: "#A3D7FC",
    actionLighter: "#E4F4FF"
  },
  units: {
    smallest: "0px",
    smaller: "2px",
    small: "4px",
    medium: "8px",
    large: "16px",
    larger: "24px",
    largest: "32px"
  }
};

export default baseTheme;
