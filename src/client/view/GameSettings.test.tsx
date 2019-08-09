import React from "react";
import { mount } from "enzyme";

import GameSettings from "./GameSettings";

describe("<GameSettings />", () => {
  it("renders three <GameSettings /> component", () => {
    const wrapper = mount(<GameSettings onChange={() => {}} />);
    expect(wrapper).toBeDefined();
  });
});
