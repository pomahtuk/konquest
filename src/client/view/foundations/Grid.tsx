import React, { ReactElement, useContext, HTMLAttributes, ReactNode } from "react";
import styled from "@emotion/styled";
import { ThemeContext } from "../themes/ThemeProvider";
import GridColumn from "./GridColumn";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  align?: "center" | "end";
  justify?: "space-between" | "center" | "space-around";
  bleed?: boolean;
  reversed?: boolean;
  className?: string;
}

export type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "half" | "full";

const Grid = ({ children, className, align, justify, bleed, reversed, ...rest }: GridProps): ReactElement => {
  const theme = useContext(ThemeContext);
  const GridStyled = styled.div({
    boxSizing: "border-box",
    clear: "both" /* Fix for floated elements before the grid, that break due to negative margin */,
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
    ...(align ? { alignItems: align !== "center" ? `flex-${align}` : align } : {}),
    ...(justify ? { justifyContent: justify } : {}),
    ...(reversed ? { flexDirection: "row-reverse" } : {}),
    [theme.media.small]: {
      margin: bleed ? "0" : `calc(-1 * ${theme.units.medium}) calc(-1 * ${theme.units.medium}/2) 0 calc(-1 * ${theme.units.medium}/2)`
    },
    [theme.media.medium]: {
      margin: bleed ? "0" : `calc(-1 * ${theme.units.large}) calc(-1 * ${theme.units.large}/2) 0 calc(-1 * v${theme.units.large}/2)`
    },
    [theme.media.large]: {
      margin: bleed ? "0" : `calc(-1 * ${theme.units.larger}) calc(-1 * ${theme.units.larger}) 0 calc(-1 * ${theme.units.larger}/2)`
    },
    [theme.media.huge]: {
      margin: bleed ? "0" : `calc(-1 * ${theme.units.largest}) calc(-1 * ${theme.units.largest}) 0 calc(-1 * ${theme.units.largest}/2)`
    }
  });
  return (
    <GridStyled {...rest} className={className}>
      {bleed
        ? React.Children.map(children, (child: ReactNode) => {
            if (child && typeof child !== "string" && typeof child !== "number" && child !== true && (child as ReactElement).type === GridColumn) {
              return React.cloneElement(child as ReactElement, { bleed: true });
            }
            return child;
          })
        : children}
    </GridStyled>
  );
};

export default Grid;
