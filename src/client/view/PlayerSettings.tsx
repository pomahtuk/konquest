import React, { ReactElement } from "react";

import PlayersList from "./PlayersList";
import AddPlayer from "./AddPlayer";

const PlayerSettings = (): ReactElement => {
  return (
    <div>
      <h1>Players:</h1>
      <PlayersList />
      <AddPlayer />
    </div>
  );
};

export default PlayerSettings;
