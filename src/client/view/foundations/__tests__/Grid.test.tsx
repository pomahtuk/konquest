import React from "react";
import { render } from "@testing-library/react";
import { matchers } from "jest-emotion";

expect.extend(matchers);

import wrapWithReduxAndStyle from "../../testHelpers/wrapWithReduxAndStyle";
import Grid from "../Grid";
import GridColumn from "../GridColumn";

const gridDemoText = "grid";

describe("<Grid />", (): void => {
  it("renders <Grid /> component", (): void => {
    const { container } = render(
      wrapWithReduxAndStyle(
        <Grid>
          <GridColumn>1</GridColumn>
        </Grid>
      )
    );
    expect(container).toMatchSnapshot();
  });

  it("renders <Grid /> with default styles", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<Grid>{gridDemoText}</Grid>));
    const element = getByText(gridDemoText);
    expect(element).not.toHaveStyleRule("align-items", "center");
    expect(element).not.toHaveStyleRule("align-items", "flex-end");
    expect(element).not.toHaveStyleRule("justify-content", "space-between");
    expect(element).not.toHaveStyleRule("justify-content", "center");
    expect(element).not.toHaveStyleRule("justify-content", "space-around");
  });

  it("renders <Grid /> with align center", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<Grid align="center">{gridDemoText}</Grid>));
    const element = getByText(gridDemoText);
    expect(element).toHaveStyleRule("align-items", "center");
  });

  it("renders <Grid /> with align end", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<Grid align="end">{gridDemoText}</Grid>));
    const element = getByText(gridDemoText);
    expect(element).toHaveStyleRule("align-items", "flex-end");
  });

  it("renders <Grid /> with justify space-between", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<Grid justify="space-between">{gridDemoText}</Grid>));
    const element = getByText(gridDemoText);
    expect(element).toHaveStyleRule("justify-content", "space-between");
  });

  it("renders <Grid /> with justify center", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<Grid justify="center">{gridDemoText}</Grid>));
    const element = getByText(gridDemoText);
    expect(element).toHaveStyleRule("justify-content", "center");
  });

  it("renders <Grid /> with justify space-around", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<Grid justify="space-around">{gridDemoText}</Grid>));
    const element = getByText(gridDemoText);
    expect(element).toHaveStyleRule("justify-content", "space-around");
  });

  it("renders <Grid /> with reversed order", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<Grid reversed>{gridDemoText}</Grid>));
    const element = getByText(gridDemoText);
    expect(element).toHaveStyleRule("flex-direction", "row-reverse");
  });

  it("renders <Grid /> in bleed variant", (): void => {
    const { container } = render(
      wrapWithReduxAndStyle(
        <Grid bleed>
          <GridColumn>{gridDemoText}</GridColumn>
          {222}
        </Grid>
      )
    );

    expect(container).toMatchSnapshot();
  });

  it("renders <Grid /> with additional className", (): void => {
    const { getByText } = render(wrapWithReduxAndStyle(<Grid className="some">{gridDemoText}</Grid>));
    const element = getByText(gridDemoText);
    expect(element.classList.contains("some")).toBe(true);
  });
});
