import React, { ReactElement, ChangeEvent } from "react";
import Planet from "../../logic/Planet";
import Player from "../../logic/Player";
import Button from "./foundations/Button";

export interface AddPlayerTurnProps {
  activePlayer: Player;
  originPlanet?: Planet;
  destinationPlanet?: Planet;
  amount: number;
  onOrderAmountChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onAddOrder: () => void;
  onCancel: () => void;
}

const AddPlayerTurn = ({
  activePlayer,
  amount,
  originPlanet,
  destinationPlanet,
  onOrderAmountChange,
  onAddOrder,
  onCancel
}: AddPlayerTurnProps): ReactElement => {
  return (
    <div>
      <h2>{activePlayer.screenName} turn</h2>
      {!originPlanet && <div>Please select origin planet</div>}
      {originPlanet && !destinationPlanet && <div>Please select destination planet</div>}
      {originPlanet && destinationPlanet && (
        <form className="pure-form">
          <fieldset>
            <legend>
              Sending fleet from {originPlanet.name} to {destinationPlanet.name}. Select amount:
            </legend>
            <input type="number" value={amount} onChange={onOrderAmountChange} />
            <Button variant="primary" onClick={onAddOrder}>
              Add order
            </Button>
          </fieldset>
        </form>
      )}
      {originPlanet && (
        <Button variant="secondary" onClick={onCancel}>
          Cancel order
        </Button>
      )}
    </div>
  );
};

export default AddPlayerTurn;
