import React, { ReactElement, useContext, HTMLAttributes, ReactNode } from "react";
import { styled } from "styletron-react";
import { ThemeContext } from "../themes/ThemeProvider";

export type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "half" | "full";

export type GridColumnProps = {
  children: ReactNode;
  size?: GridSize;
  sizeMedium?: GridSize;
  sizeLarge?: GridSize;
  sizeHuge?: GridSize;
  offset?: GridSize;
  offsetMedium?: GridSize;
  offsetLarge?: GridSize;
  offsetHuge?: GridSize;
  className?: string;
  attributes?: HTMLAttributes<HTMLDivElement>;
  bleed?: boolean;
};

const toRealValue = (val?: GridSize): GridSize | undefined => (val === "half" ? 6 : val === "full" ? 12 : val);

const GridColumn = ({
  size,
  sizeMedium,
  sizeLarge,
  sizeHuge,
  children,
  className,
  attributes,
  offset,
  offsetMedium,
  offsetLarge,
  offsetHuge,
  bleed
}: GridColumnProps): ReactElement => {
  const theme = useContext(ThemeContext);
  // prepare variables
  const realSize = toRealValue(size) || 12;
  const realOffset = toRealValue(offset);
  const realSizeMedium = toRealValue(sizeMedium);
  const realSizeLarge = toRealValue(sizeLarge);
  const realSizeHuge = toRealValue(sizeHuge);
  const realOffsetMedium = toRealValue(offsetMedium);
  const realOffsetLarge = toRealValue(offsetLarge);
  const realOffsetHuge = toRealValue(offsetHuge);
  // prepare styled component
  const GridColumnStyled = styled("div", {
    boxSizing: "border-box",
    padding: bleed ? "0" : `${theme.units.medium} calc(${theme.units.medium}/2) 0 calc(${theme.units.medium}/2)`,
    flexBasis: `calc(100% / (12/${realSize}))`,
    width: `calc(100% / (12/${realSize}))`,
    maxWidth: `calc(100% / (12/${realSize}))`,
    ...(realOffset ? { marginLeft: `calc(100% / (12/${realOffset}))` } : {}),
    [theme.media.medium]: {
      padding: bleed ? "0" : `${theme.units.large} calc(${theme.units.large}/2) 0 calc(${theme.units.large}/2)`,
      ...(realSizeMedium ? { width: `calc(100% / (12/${realSizeMedium}))` } : {}),
      ...(realOffsetMedium ? { marginLeft: `calc(100% / (12/${realOffsetMedium}))` } : {})
    },
    [theme.media.large]: {
      padding: bleed ? "0" : `${theme.units.larger} calc(${theme.units.larger}/2) 0 calc(${theme.units.larger}/2)`,
      ...(realSizeLarge ? { width: `calc(100% / (12/${realSizeLarge}))` } : {}),
      ...(realOffsetLarge ? { marginLeft: `calc(100% / (12/${realOffsetLarge}))` } : {})
    },
    [theme.media.huge]: {
      padding: bleed ? "0" : `${theme.units.largest} calc(${theme.units.largest}/2) 0 calc(${theme.units.largest}/2)`,
      ...(realSizeHuge ? { width: `calc(100% / (12/${realSizeHuge}))` } : {}),
      ...(realOffsetHuge ? { marginLeft: `calc(100% / (12/${realOffsetHuge}))` } : {})
    }
  });
  return (
    <GridColumnStyled {...attributes} className={className}>
      {children}
    </GridColumnStyled>
  );
};

export default GridColumn;
