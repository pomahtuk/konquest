import React, { ReactElement, useContext } from "react";
import { RouteComponentProps } from "@reach/router";
import { ThemeContext } from "../themes/ThemeProvider";
import { css } from "emotion";
import hexToRgba from "../helpers/hexToRgba";

const StatsRoute: React.SFC<RouteComponentProps> = (): ReactElement => {
  const theme = useContext(ThemeContext);

  const statusContainer = css`
    background: rgba(${hexToRgba(theme.colors.white, "0.3")});
    border-radius: ${theme.units.small};
    padding: 0 0 ${theme.units.largest} 0;
  `;

  const tableClass = css`
    width: 100%;
  `;

  return (
    <div className={statusContainer}>
      <table className={tableClass}>
        <thead>
          <tr>
            <th>Player</th>
            <th>Ships produced</th>
            <th>Enemy ships destroyed</th>
            <th>Enemy fleets destroyed</th>
          </tr>
        </thead>
        <tbody className={tableClass}>
          <tr>
            <td>Player one</td>
            <td>120</td>
            <td>60</td>
            <td>2</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatsRoute;
