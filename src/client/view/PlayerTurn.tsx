import React, { ReactElement, useState, ChangeEvent } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { GameState } from "../reducers/game.reducers";
import Player, { PlayerTurnOrder } from "../../logic/Player";
import { addPlayerTurn, setDestinationPlanet, setOriginPlanet, addPlayerTurnOrder } from "../actions/game.actions";
import Planet from "../../logic/Planet";
import AddPlayerTurn from "./AddPlayerTurn";
import OrderList from "./OrderList";

interface PlayerTurnStoreSlice {
  activePlayer: Player;
  originPlanet?: Planet;
  destinationPlanet?: Planet;
  orders: PlayerTurnOrder[];
}

const selectorFunction = (state: GameState): PlayerTurnStoreSlice => ({
  activePlayer: state.activePlayer as Player,
  originPlanet: state.originPlanet,
  destinationPlanet: state.destinationPlanet,
  orders: state.currentPlayerOrders
});

const PlayerTurn = (): ReactElement => {
  const dispatch = useDispatch();
  const { orders, activePlayer, originPlanet, destinationPlanet }: PlayerTurnStoreSlice = useSelector(selectorFunction, shallowEqual);
  const [newOrderAmount, setNewOrderAmount] = useState(0);

  const onOrderAmountChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewOrderAmount(parseInt(event.target.value, 10));
  };

  const cleanUpPlanets = (): void => {
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
    cleanUpPlanets();
  };

  const onCompleteTurn = (): void => {
    dispatch(
      addPlayerTurn({
        player: activePlayer,
        orders
      })
    );
    // clean up planet selection
    cleanUpPlanets();
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
      />

      <OrderList orders={orders} />

      <button onClick={onCompleteTurn}>Complete turn</button>
    </div>
  );
};

export default PlayerTurn;
