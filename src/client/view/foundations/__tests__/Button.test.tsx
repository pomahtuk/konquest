import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { matchers } from "jest-emotion";

expect.extend(matchers);

import Button from "../Button";
import wrapWithReduxAndStyle from "../../testHelpers/wrapWithReduxAndStyle";
import baseTheme from "../../themes/base.theme";

const buttonText = "hello";

describe("<Button />", (): void => {
  it("renders <Button /> component", (): void => {
    const { container } = render(wrapWithReduxAndStyle(<Button />));
    expect(container).toMatchSnapshot();
  });

  it("renders <Button /> with passed children", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<Button>{buttonText}</Button>));
    expect(getByText(buttonText)).toBeDefined();
  });

  it("renders <Button /> in primary variant", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<Button variant="primary">{buttonText}</Button>));
    const element = getByText(buttonText);
    expect(element).toHaveStyleRule("color", baseTheme.colors.white);
    expect(element).toHaveStyleRule("background-color", baseTheme.colors.action);
  });

  it("renders <Button /> in secondary variant", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<Button variant="secondary">{buttonText}</Button>));
    const element = getByText(buttonText);
    expect(element).toHaveStyleRule("color", baseTheme.colors.action);
    expect(element).toHaveStyleRule("background-color", baseTheme.colors.white);
  });

  it("renders <Button /> in destructive variant", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<Button variant="destructive">{buttonText}</Button>));
    const element = getByText(buttonText);
    expect(element).toHaveStyleRule("color", baseTheme.colors.white);
    expect(element).toHaveStyleRule("background-color", baseTheme.colors.destructive);
  });

  it("renders <Button /> in large size", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<Button size="large">{buttonText}</Button>));
    const element = getByText(buttonText);
    expect(element).toHaveStyleRule("font-size", baseTheme.fontSizes.medium);
    expect(element).toHaveStyleRule("padding", `calc(${baseTheme.units.larger} / 2) ${baseTheme.units.larger}`);
  });

  it("renders <Button /> in wide variant", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<Button wide>{buttonText}</Button>));
    const element = getByText(buttonText);
    expect(element).toHaveStyleRule("width", "100%");
  });

  it("renders <Button /> in disabled state", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<Button disabled>{buttonText}</Button>));
    const element = getByText(buttonText);
    expect(element.getAttribute("disabled")).toBeDefined();
  });

  it("renders <Button /> with additional className", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<Button className="some">{buttonText}</Button>));
    const element = getByText(buttonText);
    expect(element.classList.contains("some")).toBe(true);
  });

  it("renders <Button /> with onClick callback", (): void => {
    const fn = jest.fn();
    const { getByText } = render(wrapWithReduxAndStyle(<Button onClick={fn}>{buttonText}</Button>));
    const element = getByText(buttonText);
    fireEvent.click(element);
    expect(fn.mock.calls.length).toBe(1);
  });
});
