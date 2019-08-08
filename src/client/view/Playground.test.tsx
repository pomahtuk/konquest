import React from "react";
import { mount } from "enzyme";

import Playground from "./Playground";

describe("<Playground />", () => {
  it("renders three <Playground /> component", () => {
    const wrapper = mount(<Playground />);
    expect(wrapper).toBeDefined();
  });

  it("simulates click events", () => {
    const wrapper = mount(<Playground />);
    wrapper.find("button").simulate("click");
    expect(wrapper.exists("div")).toBe(true);
  });
});
