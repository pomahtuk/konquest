import React, { ReactElement, useState, ChangeEvent } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { addPlayerTurn, setDestinationPlanet, setOriginPlanet, addPlayerTurnOrder } from "../actions/game.actions";
import playerTurnSelectorFunction, { PlayerTurnStoreSlice } from "../selectors/playerTurn.selector";

import AddPlayerTurn from "./AddPlayerTurn";
import OrderList from "./OrderList";

const PlayerTurn = (): ReactElement => {
  const dispatch = useDispatch();
  const { orders, activePlayer, originPlanet, destinationPlanet }: PlayerTurnStoreSlice = useSelector(playerTurnSelectorFunction, shallowEqual);
  const [newOrderAmount, setNewOrderAmount] = useState(0);

  const onOrderAmountChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewOrderAmount(parseInt(event.target.value, 10));
  };

  const cleanUp = (): void => {
    setNewOrderAmount(0);
    dispatch(setOriginPlanet(undefined));
    dispatch(setDestinationPlanet(undefined));
  };

  const onAddOrder = (): void => {
    originPlanet &&
      destinationPlanet &&
      dispatch(
        addPlayerTurnOrder({
          origin: originPlanet.name,
          destination: destinationPlanet.name,
          amount: newOrderAmount
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
    cleanUp();
  };

  return (
    <div>
      <AddPlayerTurn
        activePlayer={activePlayer}
        amount={newOrderAmount}
        originPlanet={originPlanet}
        destinationPlanet={destinationPlanet}
        onOrderAmountChange={onOrderAmountChange}
        onAddOrder={onAddOrder}
        onCancel={cleanUp}
      />

      <OrderList orders={orders} />

      <button className="pure-button pure-button-primary" onClick={onCompleteTurn}>
        Complete turn
      </button>
    </div>
  );
};

export default PlayerTurn;
