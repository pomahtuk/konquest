import getPlanetLimit from "../../utils/getPlanetLimit";

describe("get planet limit", (): void => {
  it("Can calculate planetLimit", (): void => {
    const smallLimit = getPlanetLimit(4 ** 2, 2);
    expect(smallLimit).toEqual(2);

    const bigLimit = getPlanetLimit(10 ** 2, 4);
    expect(bigLimit).toEqual(16);

    const tooBigLimit = getPlanetLimit(20 ** 2, 4);
    expect(tooBigLimit).toEqual(26 - 4);
  });
});
