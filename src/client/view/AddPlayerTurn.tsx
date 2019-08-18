import React, { ReactElement, ChangeEvent } from "react";
import Planet from "../../logic/Planet";
import Player from "../../logic/Player";

export interface AddPlayerTurnProps {
  activePlayer: Player;
  originPlanet?: Planet;
  destinationPlanet?: Planet;
  amount: number;
  onOrderAmountChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onAddOrder: () => void;
}

const AddPlayerTurn = ({
  activePlayer,
  amount,
  originPlanet,
  destinationPlanet,
  onOrderAmountChange,
  onAddOrder
}: AddPlayerTurnProps): ReactElement => {
  return (
    <div>
      <h2>{activePlayer.screenName} turn</h2>
      {!originPlanet && <div>Please select origin planet</div>}
      {originPlanet && !destinationPlanet && <div>Please select destination planet</div>}
      {originPlanet && destinationPlanet && (
        <div>
          Sending fleet from {originPlanet.name} to {destinationPlanet.name}. Select amount:
          <input type="number" value={amount} onChange={onOrderAmountChange} />
          <button onClick={onAddOrder}>Add order</button>
        </div>
      )}
    </div>
  );
};

export default AddPlayerTurn;
