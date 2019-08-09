import React from "react";
import { mount } from "enzyme";

import Playground from "./Playground";

describe("<Playground />", () => {
  it("renders three <Playground /> component", () => {
    const wrapper = mount(<Playground />);
    expect(wrapper).toBeDefined();
  });
});
