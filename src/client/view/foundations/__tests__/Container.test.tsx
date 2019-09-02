import React from "react";
import { render } from "@testing-library/react";
import { matchers } from "jest-emotion";

expect.extend(matchers);

import wrapWithReduxAndStyle from "../../testHelpers/wrapWithReduxAndStyle";
import Container from "../Container";

const containerText = "hello";

describe("<Container />", (): void => {
  it("renders <Container /> component", (): void => {
    const { container } = render(wrapWithReduxAndStyle(<Container>{containerText}</Container>));
    expect(container).toMatchSnapshot();
  });

  it("renders <Container /> as centered", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<Container centered>{containerText}</Container>));
    const element = getByText(containerText);
    expect(element).toHaveStyleRule("margin", "0 auto");
  });

  it("renders <Container /> with additional className", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<Container className="some">{containerText}</Container>));
    const element = getByText(containerText);
    expect(element.classList.contains("some")).toBe(true);
  });
});
