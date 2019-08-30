import React, { ReactElement, useContext } from "react";
import { css } from "emotion";

import { GalaxyCredit } from "../App";
import { ThemeContext } from "./themes/ThemeProvider";

const ImageCredentials = ({ credit }: { credit: GalaxyCredit }): ReactElement => {
  const theme = useContext(ThemeContext);

  return (
    <div
      className={css`
        position: absolute;
        bottom: ${theme.units.medium};
        right: ${theme.units.medium};
        z-index: ${theme.zIndex[0]};
      `}
    >
      <a
        href={credit.link}
        className={css`
          color: ${theme.colors.white};
          text-decoration: none;
          border-bottom: 1px dashed ${theme.colors.white};
          :visited {
            color: ${theme.colors.white};
          }
        `}
      >
        {'"'}
        {credit.title}
        {'"'} by {credit.credit}
      </a>
    </div>
  );
};

export default ImageCredentials;
