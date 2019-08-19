import React, { ReactElement, ChangeEvent } from "react";

export interface AddPlayerProps {
  newPlayerName: string;
  onNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onAddPlayer: () => void;
}

const AddPlayer = ({ newPlayerName, onNameChange, onAddPlayer }: AddPlayerProps): ReactElement => (
  <form className="pure-form">
    <fieldset>
      <input type="text" value={newPlayerName} onChange={onNameChange} placeholder="Player name" required />
      <button className="pure-button pure-button-secondary" onClick={onAddPlayer}>
        Add player
      </button>
    </fieldset>
  </form>
);

export default AddPlayer;
