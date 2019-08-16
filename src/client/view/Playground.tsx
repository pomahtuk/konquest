import React, { ReactElement } from "react";

import GameField from "./GameField";
import GameSettings from "./GameSettings";

const Playground = (): ReactElement => {
  return (
    <div>
      <GameSettings />
      <GameField />
    </div>
  );
};

export default Playground;
