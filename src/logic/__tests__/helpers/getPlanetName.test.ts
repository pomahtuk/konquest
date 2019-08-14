import getPlanetName from "../../helpers/getPlanetName";

describe("get planet name", (): void => {
  it("Can generate name", (): void => {
    const name = getPlanetName(0);
    expect(name).toBe("A");
  });
});
