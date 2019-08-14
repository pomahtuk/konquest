import getDistanceBetweenPoints from "../../helpers/getDistanceBetweenPoints";

describe("get distance between two points", (): void => {
  it("Can get correct distance in turns", (): void => {
    const A = {
      x: 0,
      y: 0
    };
    const B = {
      x: 3,
      y: 3
    };
    expect(getDistanceBetweenPoints(A, B)).toBe(1);
    expect(getDistanceBetweenPoints(B, A)).toBe(1);
    A.x = 2;
    A.y = 2;
    expect(getDistanceBetweenPoints(A, B)).toBe(0);
    expect(getDistanceBetweenPoints(B, A)).toBe(0);
  });
});
