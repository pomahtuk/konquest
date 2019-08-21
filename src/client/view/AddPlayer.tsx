import React, { ReactElement, ChangeEvent } from "react";
import Button from "./foundations/Button";
import InputText from "./foundations/InputText";

export interface AddPlayerProps {
  newPlayerName: string;
  onNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onAddPlayer: () => void;
}

const AddPlayer = ({ newPlayerName, onNameChange, onAddPlayer }: AddPlayerProps): ReactElement => {
  return (
    <React.Fragment>
      <InputText label="Player name" type="text" value={newPlayerName} onChange={onNameChange} placeholder="Player name" />
      <Button onClick={onAddPlayer} variant="secondary">
        Add player
      </Button>
    </React.Fragment>
  );
};

export default AddPlayer;
