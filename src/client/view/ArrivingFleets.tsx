import React, { ReactElement } from "react";
import { useSelector } from "react-redux";

import arrivingFleetSelector, { ArrivingFleetsStoreSlice } from "../selectors/arrivingFleet.selector";

const ArrivingFleets = (): ReactElement | null => {
  const { currentPlayerFleets }: ArrivingFleetsStoreSlice = useSelector(arrivingFleetSelector);

  return currentPlayerFleets && currentPlayerFleets.length > 0 ? (
    <ul>
      {currentPlayerFleets.map((fleet) => (
        <li key={`${fleet.amount}-${fleet.destination}-${fleet.arrivingIn}`}>
          Fleet({fleet.amount}) arriving to {fleet.destination} in {fleet.arrivingIn} turns
        </li>
      ))}
    </ul>
  ) : null;
};

export default ArrivingFleets;
