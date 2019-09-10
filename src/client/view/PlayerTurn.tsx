import React, { ReactElement, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { addPlayerTurn } from "../actions/game.actions";
import { addPlayerTurnOrder, clearTurnData, unsetPlanets, removePlayerTurnOrder } from "../actions/turn.actions";
import playerTurnSelector, { PlayerTurnStoreSlice } from "../selectors/playerTurn.selector";

import AddPlayerTurn from "./AddPlayerTurn";
import OrderList from "./OrderList";
import Button from "./foundations/Button";
import useSlider from "../hooks/useSlider";
import ArrivingFleets from "./ArrivingFleets";

const PlayerTurn = (): ReactElement => {
  const dispatch = useDispatch();
  const { orders, activePlayer, originPlanet, destinationPlanet, currentPlayerFleets, currentShipsModifier }: PlayerTurnStoreSlice = useSelector(
    playerTurnSelector,
    shallowEqual
  );
  const { value, onChange, setValue } = useSlider(0);

  useEffect(() => {
    if (originPlanet) {
      setValue(originPlanet.ships - (currentShipsModifier[originPlanet.name] || 0));
    }
  }, [setValue, originPlanet, currentShipsModifier]);

  useEffect(() => {
    // make sure we are not able to send more than we have
    if (originPlanet) {
      const maxValue = originPlanet.ships - (currentShipsModifier[originPlanet.name] || 0);
      if (value > maxValue) {
        setValue(maxValue);
      }

      if (value < 0) {
        setValue(0);
      }
    }
    // also make sure we are not sending negative value
  }, [value, setValue, originPlanet, currentShipsModifier]);

  const cleanUp = (): void => {
    setValue(0);
    dispatch(unsetPlanets());
  };

  const onAddOrder = (): void => {
    originPlanet &&
      destinationPlanet &&
      dispatch(
        addPlayerTurnOrder({
          origin: originPlanet.name,
          destination: destinationPlanet.name,
          amount: value as number
        })
      );
    cleanUp();
  };

  const onCompleteTurn = (): void => {
    dispatch(
      addPlayerTurn({
        player: activePlayer,
        orders
      })
    );
    // clean up planet selection
    setValue(0);
    dispatch(clearTurnData());
  };

  return (
    <div>
      <AddPlayerTurn
        activePlayer={activePlayer}
        amount={value as number}
        originPlanet={originPlanet}
        destinationPlanet={destinationPlanet}
        onOrderAmountChange={onChange}
        onAddOrder={onAddOrder}
        onCancel={cleanUp}
      />

      <OrderList
        orders={orders}
        removeOrder={(index: number): void => {
          dispatch(removePlayerTurnOrder(index));
        }}
      />

      <Button variant="primary" onClick={onCompleteTurn}>
        Complete turn
      </Button>

      <ArrivingFleets fleets={currentPlayerFleets} />
    </div>
  );
};

export default PlayerTurn;
