type Sizes = "smallest" | "smaller" | "small" | "medium" | "large" | "larger" | "largest";

type Colors =
  | "destructiveDark"
  | "destructive"
  | "grayscaleDark"
  | "grayscale"
  | "grayscaleLight"
  | "black"
  | "white"
  | "actionDark"
  | "action"
  | "actionLight"
  | "primary"
  | "primaryDark"
  | "background";

type FontWeights = "normal" | "medium" | "bold";

type FontStacks = "sans" | "emphasis" | "mono";

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
    sans: '"Titillium Web", sans-serif;',
    emphasis: '"Electrolize", serif',
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

    grayscaleDark: "#333333",
    grayscale: "#6B6B6B",
    grayscaleLight: "#E6E6E6",

    black: "#000",
    white: "#fff",

    actionDark: "#005C9D",
    action: "#0071C2",
    actionLight: "#E4F4FF",

    background: "#021114a6",
    primary: "#26dafd",
    primaryDark: "#029dbb"
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
