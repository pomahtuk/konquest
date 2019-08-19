import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { GameState, ArrivingFleet } from "../reducers/game.reducers";

interface ArrivingFleetsStoreSlice {
  currentPlayerFleets: ArrivingFleet[];
}

const selectorFunction = (state: GameState): ArrivingFleetsStoreSlice => ({
  currentPlayerFleets: state.currentPlayerFleets
});

const ArrivingFleets = (): ReactElement | null => {
  const { currentPlayerFleets }: ArrivingFleetsStoreSlice = useSelector(selectorFunction);

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
