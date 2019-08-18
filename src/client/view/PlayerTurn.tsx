import React, { ReactElement, useState, ChangeEvent } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { GameState } from "../reducers/game.reducers";
import Player, { PlayerTurnOrder } from "../../logic/Player";
import { addPlayerTurn, setDestinationPlanet, setOriginPlanet } from "../actions/game.actions";
import Planet from "../../logic/Planet";

interface PlayerTurnStoreSlice {
  activePlayer: Player;
  originPlanet?: Planet;
  destinationPlanet?: Planet;
}

const selectorFunction = (state: GameState): PlayerTurnStoreSlice => ({
  activePlayer: state.activePlayer as Player,
  originPlanet: state.originPlanet,
  destinationPlanet: state.destinationPlanet
});

const PlayerTurn = (): ReactElement => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState<PlayerTurnOrder[]>([]);
  const [newOrderAmount, setNewOrderAmount] = useState(0);
  const { activePlayer, originPlanet, destinationPlanet }: PlayerTurnStoreSlice = useSelector(selectorFunction, shallowEqual);

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
      setOrders([
        ...orders,
        {
          amount: newOrderAmount,
          origin: originPlanet.name,
          destination: destinationPlanet.name
        }
      ]);
    cleanUpPlanets();
  };

  const onCompleteTurn = (): void => {
    dispatch(
      addPlayerTurn({
        player: activePlayer,
        orders
      })
    );
    // cleanup orders
    setOrders([]);
    setNewOrderAmount(0);
    // clean up planet selection
    cleanUpPlanets();
  };

  return (
    <div>
      <h2>{activePlayer.screenName} turn</h2>
      {!originPlanet && <div>Please select origin planet</div>}
      {originPlanet && !destinationPlanet && <div>Please select destination planet</div>}
      {originPlanet && destinationPlanet && (
        <div>
          Sending fleet from {originPlanet.name} to {destinationPlanet.name}. Select amount:
          <input type="number" value={newOrderAmount} onChange={onOrderAmountChange} />
          <button onClick={onAddOrder}>Add order</button>
        </div>
      )}

      {orders && orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={`${order.amount}${order.origin}${order.destination}`}>
              Send fleet({order.amount}) from {order.origin} to {order.destination}
            </li>
          ))}
        </ul>
      ) : (
        "No orders"
      )}
      <button onClick={onCompleteTurn}>Complete turn</button>
    </div>
  );
};

export default PlayerTurn;
