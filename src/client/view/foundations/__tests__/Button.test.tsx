import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { matchers } from "jest-emotion";

expect.extend(matchers);

import Button from "../Button";
import wrapWithReduxAndStyle from "../../testHelpers/wrapWithReduxAndStyle";
import baseTheme from "../../themes/base.theme";
import hexToRgba from "../../helpers/hexToRgba";

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
    expect(element).toHaveStyleRule("color", baseTheme.colors.primaryLight);
    expect(element).toHaveStyleRule(
      "background-color",
      `rgba(${hexToRgba(baseTheme.colors.buttonBg, "0.65")
        .split(", ")
        .join(",")})`
    );
  });

  it("renders <Button /> in destructive variant", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<Button variant="destructive">{buttonText}</Button>));
    const element = getByText(buttonText);
    expect(element).toHaveStyleRule("color", baseTheme.colors.red);
    expect(element).toHaveStyleRule(
      "background-color",
      `rgba(${hexToRgba(baseTheme.colors.buttonDestructiveBg, "0.65")
        .split(", ")
        .join(",")})`
    );
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
