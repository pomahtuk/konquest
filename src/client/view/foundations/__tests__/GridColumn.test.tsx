import React from "react";
import { render } from "@testing-library/react";
import { matchers } from "jest-emotion";

expect.extend(matchers);

import wrapWithReduxAndStyle from "../../testHelpers/wrapWithReduxAndStyle";
import GridColumn from "../GridColumn";

const gridColumnText = "column";

describe("<GridColumn />", (): void => {
  it("renders <GridColumn /> component", (): void => {
    const { container } = render(wrapWithReduxAndStyle(<GridColumn>{gridColumnText}</GridColumn>));
    expect(container).toMatchSnapshot();
  });

  it("renders <GridColumn /> in bleed variant", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<GridColumn bleed>{gridColumnText}</GridColumn>));
    const element = getByText(gridColumnText);
    expect(element).toHaveStyleRule("padding", "0");
  });

  it("renders <GridColumn /> in half size", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<GridColumn size="half">{gridColumnText}</GridColumn>));
    const element = getByText(gridColumnText);
    expect(element).toHaveStyleRule("width", "calc(100% / (12/6))");
  });

  it("renders <GridColumn /> in size 3", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<GridColumn size={3}>{gridColumnText}</GridColumn>));
    const element = getByText(gridColumnText);
    expect(element).toHaveStyleRule("width", "calc(100% / (12/3))");
  });

  it("renders <GridColumn /> in size 3 with offset 3", (): void => {
    const { getByText } = render(
      wrapWithReduxAndStyle(
        <GridColumn size={3} offset={3}>
          {gridColumnText}
        </GridColumn>
      )
    );
    const element = getByText(gridColumnText);
    expect(element).toHaveStyleRule("margin-left", "calc(100% / (12/3))");
  });

  it("renders <GridColumn /> in size 4 and medium 3 and large 2 and huge 1", (): void => {
    const { container } = render(
      wrapWithReduxAndStyle(
        <GridColumn size={4} sizeMedium={3} sizeLarge={2} sizeHuge={1}>
          {gridColumnText}
        </GridColumn>
      )
    );
    expect(container).toMatchSnapshot();
  });

  it("renders <GridColumn /> in size 4, offsets: 4 and medium 3 and large 2 and huge 1", (): void => {
    const { container } = render(
      wrapWithReduxAndStyle(
        <GridColumn size={4} offset={4} offsetMedium={3} offsetLarge={2} offsetHuge={1}>
          {gridColumnText}
        </GridColumn>
      )
    );
    expect(container).toMatchSnapshot();
  });
});
