import React, { ReactElement, ChangeEvent } from "react";
import Planet from "../../logic/Planet";
import Player from "../../logic/Player";
import Button from "./foundations/Button";
import InputText from "./foundations/InputText";

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
        <React.Fragment>
          <legend>
            Sending fleet from {originPlanet.name} to {destinationPlanet.name}. Select amount:
          </legend>
          <InputText type="number" value={amount} onChange={onOrderAmountChange} data-testid="order-amount" />
          <Button variant="primary" onClick={onAddOrder}>
            Add order
          </Button>
        </React.Fragment>
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
