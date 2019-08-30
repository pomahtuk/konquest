import React, { ReactElement, useContext } from "react";
import Planet from "../../logic/Planet";
import { css } from "emotion";
import { ThemeContext } from "./themes/ThemeProvider";

interface PlanetTooltipContentProps {
  planet: Planet;
  modifier?: number;
}

const PlanetTooltipContent = ({ planet, modifier = 0 }: PlanetTooltipContentProps): ReactElement => {
  const theme = useContext(ThemeContext);

  const firstTdClass = css`
    padding-right: ${theme.units.medium};
  `;

  const lastTdClass = css`
    text-align: right;
  `;

  return (
    <table
      className={css`
        text-align: left;
      `}
    >
      <tbody>
        <tr>
          <td className={firstTdClass}>Owner:</td>
          <td className={lastTdClass}>{planet.owner ? planet.owner.screenName : "none"}</td>
        </tr>
        <tr>
          <td className={firstTdClass}>Production:</td>
          <td className={lastTdClass}>{planet.production}</td>
        </tr>
        <tr>
          <td className={firstTdClass}>Kill percent:</td>
          <td className={lastTdClass}>{planet.killPercent}</td>
        </tr>
        <tr>
          <td className={firstTdClass}>Ships:</td>
          <td className={lastTdClass}>{planet.ships - modifier}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default PlanetTooltipContent;
