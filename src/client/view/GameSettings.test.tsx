import React from "react";
import { mount } from "enzyme";

import GameSettings from "./GameSettings";

describe("<GameSettings />", (): void => {
  it("renders three <GameSettings /> component", (): void => {
    const wrapper = mount(<GameSettings onChange={(): void => {}} />);
    expect(wrapper).toBeDefined();
  });
});
