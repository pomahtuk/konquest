import { randomInt, randomBool } from "./random";

describe("random helpers", (): void => {
  it("Can generate randomInt with given parameters", (): void => {
    const int = randomInt(1, 2);
    expect(int).toBeGreaterThanOrEqual(1);
    expect(int).toBeLessThanOrEqual(2);
  });

  it("Can generate randomBool", (): void => {
    const val = randomBool();
    expect(typeof val).toBe("boolean");
  });
});
