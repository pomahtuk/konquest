import hexToRgba from "./hexToRgba";

describe("hexToRgba", (): void => {
  it("Could convert hex color to RGBA", (): void => {
    expect(hexToRgba("#fff", "0.0")).toEqual("255, 255, 255, 0.0");
  });
});
