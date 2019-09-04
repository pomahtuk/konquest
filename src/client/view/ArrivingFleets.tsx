import React, { ReactElement } from "react";
import { ArrivingFleet } from "../reducers/game.reducers";

export interface ArrivingFleetsProps {
  fleets: ArrivingFleet[];
}

const ArrivingFleets = ({ fleets }: ArrivingFleetsProps): ReactElement | null => {
  return fleets && fleets.length > 0 ? (
    <ul>
      {fleets.map((fleet) => (
        <li key={`${fleet.amount}-${fleet.destination}-${fleet.arrivingIn}`}>
          Fleet({fleet.amount}) arriving to {fleet.destination} in {fleet.arrivingIn} turns
        </li>
      ))}
    </ul>
  ) : null;
};

export default ArrivingFleets;
