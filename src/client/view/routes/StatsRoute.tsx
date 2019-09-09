import React, { ReactElement, useContext } from "react";
import { RouteComponentProps, Redirect } from "@reach/router";
import { ThemeContext } from "../themes/ThemeProvider";
import { css } from "emotion";
import hexToRgba from "../helpers/hexToRgba";
import { useSelector, shallowEqual } from "react-redux";
import statsRouteSelector from "../../selectors/stats.route.selector";
import { GameStatus } from "../../../logic/Game";
import Player from "../../../logic/Player";
import { SETTINGS } from "../../routeNames";

const StatsRoute: React.SFC<RouteComponentProps> = (): ReactElement => {
  const theme = useContext(ThemeContext);
  const { winner, players, status } = useSelector(statsRouteSelector, shallowEqual);

  if (!winner || status !== GameStatus.COMPLETED) {
    return <Redirect to={SETTINGS} />;
  }

  const statusContainer = css`
    background: rgba(${hexToRgba(theme.colors.white, "0.3")});
    border-radius: ${theme.units.small};
    padding: ${theme.units.medium} 0;
  `;

  const tableClass = css`
    width: 100%;
    text-align: center;

    tr {
      padding: ${theme.units.small};
    }
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
        <tbody>
          {players.map(
            (player: Player): ReactElement => (
              <tr key={player.id}>
                <td>
                  {player.id === winner.id && "👑 "}
                  {player.screenName}
                </td>
                <td>{player.statShipCount}</td>
                <td>{player.statEnemyShipsDestroyed}</td>
                <td>{player.statEnemyFleetsDestroyed}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StatsRoute;
