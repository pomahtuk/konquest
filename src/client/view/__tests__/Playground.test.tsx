import React from "react";
import { mount } from "enzyme";

import Playground from "../Playground";

describe("<Playground />", (): void => {
  it("renders three <Playground /> component", (): void => {
    const wrapper = mount(<Playground />);
    expect(wrapper).toBeDefined();
  });
});
