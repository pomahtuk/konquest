import React, { ReactElement, ChangeEvent } from "react";
import Button from "./foundations/Button";

export interface AddPlayerProps {
  newPlayerName: string;
  onNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onAddPlayer: () => void;
}

const AddPlayer = ({ newPlayerName, onNameChange, onAddPlayer }: AddPlayerProps): ReactElement => (
  <form className="pure-form">
    <fieldset>
      <input type="text" value={newPlayerName} onChange={onNameChange} placeholder="Player name" required />
      <Button onClick={onAddPlayer} variant="secondary">
        Add player
      </Button>
    </fieldset>
  </form>
);

export default AddPlayer;
