import React, { ReactElement, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { addPlayerTurn } from "../actions/game.actions";
import { addPlayerTurnOrder, clearTurnData, unsetPlanets } from "../actions/turn.actions";
import playerTurnSelector, { PlayerTurnStoreSlice } from "../selectors/playerTurn.selector";

import AddPlayerTurn from "./AddPlayerTurn";
import OrderList from "./OrderList";
import Button from "./foundations/Button";
import useSlider from "../hooks/useSlider";

const PlayerTurn = (): ReactElement => {
  const dispatch = useDispatch();
  const { orders, activePlayer, originPlanet, destinationPlanet }: PlayerTurnStoreSlice = useSelector(playerTurnSelector, shallowEqual);
  const { value, onChange, setValue } = useSlider(0);

  useEffect(() => {
    if (originPlanet) {
      setValue(originPlanet.ships);
    }
  }, [setValue, originPlanet]);

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

      <OrderList orders={orders} />

      <Button variant="primary" onClick={onCompleteTurn}>
        Complete turn
      </Button>
    </div>
  );
};

export default PlayerTurn;
